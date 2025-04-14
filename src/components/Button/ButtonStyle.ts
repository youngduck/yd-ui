import styled from "styled-components";

export const StyledButton = styled.div<{
  $mode: string;
  $width?: string;
  $height?: string;
}>`
  display: block;
  cursor: pointer;
  flex-shrink: 0;
  text-align: center;
  height: ${(props) => props.$height || "4.2rem"};
  font-size: 1.8rem;
  line-height: ${(props) => props.$height || "4.2rem"};
  border-radius: 0.4rem;
  font-weight: 500;
  margin: 0 0.5rem;
  width: ${(props) => props.$width || "120px"};

  &:hover {
    border-radius: 0.4rem;
  }

  ${({ $mode }) => {
    switch ($mode) {
      case "delete":
        return `
            background-color: #ffffff;
            border: 0.1rem solid black;
            color: #000000;
            &:hover {
              color: rgba(237, 21, 21, 1);
              background-color: white;
              border: 0.1rem solid rgba(237, 21, 21, 1);
            }
          `;
      case "generate":
        return `
            background-color: #ffffff;
            border: 0.1rem solid #0a8cc4;
            color: #0a8cc4;
  
            &:hover {
              color: #0a8cc4;
              background-color: rgba(241, 250, 254, 1);
              border: 0.1rem solid #0a8cc4;
            }
          `;
      case "save":
        return `
            background-color: #0a8cc4;
            border: none;
            color: #ffffff;
  
            &:hover {
              color: white;
              background-color: rgba(9, 109, 155, 1);
            }
          `;
      case "elmark":
        return `
            background-color: rgba(248, 114, 9, 1);
            border: 0.1rem solid rgba(248, 114, 9, 1);
            color: #ffffff;
  
            &:hover {
              color: black;
              background-color: rgba(248, 114, 9, 1);
              border: 0.1rem solid rgba(248, 114, 9, 1);
            }
          `;
      case "excel":
        return `
            background-color: rgba(248, 114, 9, 1);
            border: 0.1rem solid rgba(248, 114, 9, 1);
            color: #ffffff;
  
            &:hover {
              color: black;
              background-color: rgba(248, 114, 9, 1);
              border: 0.1rem solid rgba(248, 114, 9, 1);
            }
          `;
      case "elfile":
        return `
            background-color: #ffffff;
            border: 0.1rem solid rgba(248, 114, 9, 1);
            color: rgba(248, 114, 9, 1);
  
            &:hover {
              color: rgba(241, 250, 254, 1);
              background-color: rgba(241, 250, 254, 1);
              border: 0.1rem solid rgba(248, 114, 9, 1);
            }
          `;
      default:
        return "";
    }
  }}
`;
