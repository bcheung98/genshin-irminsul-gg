import { useState } from "react";
import parse from "html-react-parser";

// Component imports
import TCGCostIcon from "../TCGCostIcon";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Box,
    IconButton,
    Stack,
    Divider,
    Collapse,
    Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Helper imports
import { parseTCGSkillDescription } from "helpers/parseTCGSkillDescription";
import { TCGKeyword } from "types/tcg";
import { useAppSelector } from "helpers/hooks";
import { tcgCommonKeywords } from "data/tcg/tcgCommonKeywords";
import { selectKeywords } from "reducers/tcg";
import { FlexBox } from "styled/StyledBox";
import InfoChip from "custom/InfoChip";

interface TCGKeywordPopupProps {
    handleClose: () => void;
    keyword: TCGKeyword | null;
}

function TCGKeywordPopup({ handleClose, keyword }: TCGKeywordPopupProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const keywords = [...tcgCommonKeywords, ...useAppSelector(selectKeywords)];
    const subKeywords: TCGKeyword[] = [];

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    let mainKeyword = "";
    let isCommonKeyword = false;

    if (keyword) {
        isCommonKeyword = tcgCommonKeywords.includes(keyword);
        if (keyword.type) {
            const keywordType = parse(keyword.type);
            if (typeof keywordType === "object") {
                if (
                    "props" in keywordType &&
                    keywordType.props.className.startsWith("tooltip")
                ) {
                    const tag = keywordType.props.className.split("-")[1];
                    const subKeyword = keywords.find(
                        (kwrd) => kwrd.tag === tag
                    );
                    if (subKeyword && !subKeywords.includes(subKeyword)) {
                        subKeywords.push(subKeyword);
                    }
                }
            }
        }
        const description = parse(keyword.description);
        if (Array.isArray(description)) {
            description.forEach((element) => {
                if (
                    element.props?.className &&
                    element.props.className.startsWith("tooltip-")
                ) {
                    const tag = element.props.className.split("tooltip-")[1];
                    const subKeyword = keywords.find(
                        (kwrd) => kwrd.tag === tag
                    );
                    if (subKeyword && !subKeywords.includes(subKeyword)) {
                        isKeywordSkill(subKeyword.type)
                            ? subKeywords.unshift(subKeyword)
                            : subKeywords.push(subKeyword);
                    }
                }
            });
        }
    }

    function KeywordInfo({ keyword }: { keyword: TCGKeyword }) {
        mainKeyword = keyword.tag;
        return (
            <FlexBox
                sx={{
                    flexWrap: "wrap",
                    columnGap: "16px",
                    rowGap: "8px",
                    width: "75%",
                    py: "16px",
                }}
            >
                {keyword.icon && (
                    <Image
                        src={`tcg/${keyword.icon}`}
                        alt={keyword.tag}
                        style={{
                            width: matches_sm_up ? "48px" : "40px",
                            border: `2px solid ${theme.border.color.primary}`,
                            borderRadius: "64px",
                            backgroundColor: theme.appbar.hover,
                        }}
                    />
                )}
                <Box>
                    <TextStyled
                        variant="h6-styled"
                        sx={{ color: theme.appbar.color }}
                    >
                        {keyword.name}
                    </TextStyled>
                    <FlexBox
                        sx={{
                            flexWrap: "wrap",
                            columnGap: "8px",
                            rowGap: "4px",
                        }}
                    >
                        {keyword.cost && (
                            <Box sx={{ mt: "4px" }}>
                                <TCGCostIcon
                                    cost={keyword.cost}
                                    orientation="row"
                                    size={matches_sm_up ? "36px" : "32px"}
                                />
                            </Box>
                        )}
                        {keyword.subType && (
                            <Box sx={{ mt: "4px" }}>
                                <InfoChip
                                    color="tertiary"
                                    src={`tcg/icons/subtypes/${keyword.subType}`}
                                    label={keyword.subType}
                                />
                            </Box>
                        )}
                        {keyword.combatAction && (
                            <Box sx={{ mt: "4px" }}>
                                <InfoChip
                                    color="tertiary"
                                    src={`tcg/icons/subtypes/Combat_Action`}
                                    label="Combat Action"
                                />
                            </Box>
                        )}
                    </FlexBox>
                </Box>
            </FlexBox>
        );
    }

    function KeywordDescription({
        keyword,
        isSubKeyword = false,
    }: {
        keyword: TCGKeyword;
        isSubKeyword?: boolean;
    }) {
        return (
            <Box>
                <FlexBox
                    sx={{
                        flexWrap: "wrap",
                        gap: "8px",
                        justifyContent: "space-between",
                    }}
                >
                    <Stack
                        spacing={isKeywordSkill(keyword.type) ? 2 : 1}
                        direction="row"
                        alignItems="center"
                    >
                        {keyword.icon && keyword.tag !== mainKeyword && (
                            <Image
                                src={`tcg/${keyword.icon}`}
                                alt={keyword.icon}
                                style={{
                                    width: matches_sm_up ? "32px" : "28px",
                                    border: isKeywordSkill(keyword.type)
                                        ? `2px solid ${theme.border.color.primary}`
                                        : "none",
                                    borderRadius: "64px",
                                    backgroundColor: isKeywordSkill(
                                        keyword.type
                                    )
                                        ? theme.appbar.backgroundColor
                                        : "transparent",
                                }}
                            />
                        )}
                        <Box>
                            {keyword.tag !== mainKeyword && (
                                <TextStyled variant="h6-styled">
                                    {parseTCGSkillDescription({
                                        description: keyword.name,
                                        theme: theme,
                                        matches: matches_sm_up,
                                    })}
                                </TextStyled>
                            )}
                            {keyword.type &&
                                (!isSubKeyword ||
                                    isKeywordSkill(keyword.type)) && (
                                    <TextStyled
                                        variant="body1-styled"
                                        sx={{ color: theme.text.highlight }}
                                    >
                                        {parseTCGSkillDescription({
                                            description: keyword.type,
                                            theme: theme,
                                            matches: matches_sm_up,
                                            onClick: toggleDropdownState,
                                        })}
                                    </TextStyled>
                                )}
                        </Box>
                    </Stack>
                    {keyword.cost && isSubKeyword && (
                        <TCGCostIcon
                            cost={keyword.cost}
                            orientation="row"
                            size={matches_sm_up ? "36px" : "32px"}
                        />
                    )}
                </FlexBox>
                <Text
                    sx={{
                        color: theme.text.description,
                        mt: "4px",
                    }}
                >
                    {parseTCGSkillDescription({
                        description: keyword.description,
                        theme: theme,
                        matches: matches_sm_up,
                        onClick: toggleDropdownState,
                        disableLink: isSubKeyword,
                    })}
                </Text>
            </Box>
        );
    }

    return (
        <Box sx={{ overflowY: "auto" }}>
            {keyword && (
                <MainContentBox
                    title={
                        isCommonKeyword ? (
                            "Detailed Rules"
                        ) : (
                            <KeywordInfo keyword={keyword} />
                        )
                    }
                    actions={
                        <IconButton
                            disableRipple
                            onClick={handleClose}
                            sx={{ color: theme.appbar.color, p: 0 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    headerProps={{
                        dense: true,
                        padding: "0px 16px",
                    }}
                    contentProps={{ padding: "16px" }}
                >
                    <Stack spacing={2}>
                        <KeywordDescription keyword={keyword} />
                        {subKeywords.length > 0 && (
                            <Collapse
                                in={dropdownOpen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <Divider sx={{ mb: 1 }} />
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    onClick={toggleDropdownState}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <TextStyled
                                        sx={{
                                            color: theme.text.highlight,
                                        }}
                                    >
                                        Detailed Rules
                                    </TextStyled>
                                    <IconButton disableRipple>
                                        <KeyboardArrowUpIcon />
                                    </IconButton>
                                </Stack>
                                <Stack spacing={1.5}>
                                    {subKeywords.map((keyword, index) => (
                                        <Card
                                            key={index}
                                            sx={{
                                                px: isKeywordSkill(keyword.type)
                                                    ? 2
                                                    : 1,
                                                py: 1,
                                                backgroundColor:
                                                    theme.background(
                                                        1,
                                                        "light"
                                                    ),
                                                border: theme.mainContentBox
                                                    .border,
                                                borderRadius:
                                                    theme.mainContentBox
                                                        .borderRadius,
                                            }}
                                        >
                                            <KeywordDescription
                                                keyword={keyword}
                                                isSubKeyword
                                            />
                                        </Card>
                                    ))}
                                </Stack>
                            </Collapse>
                        )}
                    </Stack>
                </MainContentBox>
            )}
        </Box>
    );
}

export default TCGKeywordPopup;

function isKeywordSkill(tag: string | undefined) {
    return tag === "Normal Attack" || tag?.startsWith("Elemental");
}
