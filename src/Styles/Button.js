import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.primary ? "grey" : "white"};
  color: ${props => props.primary ? "white" : "grey"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 0px solid grey;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;

export default Button;