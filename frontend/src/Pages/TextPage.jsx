import TextBox from "../Common-Component/TextBox";

function TextPage({ message }) {
  return (
    <TextBox>
      <h1>{message}</h1>
    </TextBox>
  )
}

export default TextPage;