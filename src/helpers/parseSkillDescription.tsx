import { BaseSyntheticEvent } from "react";
import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";
import { useTheme, TypographyProps } from "@mui/material";

export function parseSkillDescription({
    description,
    targetClassName = "text-value",
    newClassName,
    onClick,
    disableLink = false,
}: {
    description: string;
    textVariant?: TypographyProps["variant"];
    targetClassName?: string;
    newClassName?: string;
    onClick?: (event: BaseSyntheticEvent) => void;
    disableLink?: boolean;
}) {
    const theme = useTheme();
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <span
                            className={
                                className === targetClassName
                                    ? newClassName
                                    : className
                            }
                            style={{
                                color: theme.text[
                                    tag as keyof typeof theme.text
                                ],
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.highlight.weight
                                        : theme.font.element.weight,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                } else if (className.split("-")[0].startsWith("tooltip")) {
                    return (
                        <span
                            className={className}
                            style={{
                                color: theme.text[
                                    getTextColor(
                                        className
                                    ) as keyof typeof theme.text
                                ],
                                textDecoration: !disableLink
                                    ? "underline"
                                    : "none",
                                cursor: !disableLink ? "pointer" : "text",
                            }}
                            onClick={onClick}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                }
            }
        },
    };

    return parse(description, options);
}

function getTextColor(className: string) {
    if (className.startsWith("tooltipHighlight-")) {
        return "highlight";
    } else {
        return "primary";
    }
}
