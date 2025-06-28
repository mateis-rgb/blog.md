import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { CodeBlockProps } from "../types"

import SyntaxHighlighter from "react-syntax-highlighter"


const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
	return (
		<div className="my-4 rounded-lg overflow-hidden shadow-lg">
			<SyntaxHighlighter language={language} style={atomOneDark} showLineNumbers>
				{ value }
			</SyntaxHighlighter>
		</div>
	);
}

export default CodeBlock;