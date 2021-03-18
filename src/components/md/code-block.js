import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
// import dracula from "prism-react-renderer/themes/dracula"
// import duotoneDark from "prism-react-renderer/themes/duotoneDark"
// import duotoneLight from "prism-react-renderer/themes/duotoneLight"
import github from "prism-react-renderer/themes/github"
// import nightOwl from "prism-react-renderer/themes/nightOwl"
// import nightOwlLight from "prism-react-renderer/themes/nightOwlLight"
// import oceanicNext from "prism-react-renderer/themes/oceanicNext"
// import palenight from "prism-react-renderer/themes/palenight"
// import shadesOfPurple from "prism-react-renderer/themes/shadesOfPurple"
// import synthwave84 from "prism-react-renderer/themes/synthwave84"
// import ultramin from "prism-react-renderer/themes/ultramin"
// import vsDark from "prism-react-renderer/themes/vsDark"

// TODO github for light, palenight for dark theme
export default ({ children, className }) => {
  const language = className?.replace(/language-/, "")
  return (
    <Highlight
      {...defaultProps}
      theme={github}
      code={children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
