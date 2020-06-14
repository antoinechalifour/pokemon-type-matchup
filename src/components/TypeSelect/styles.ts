import styled from "styled-components";

export const TypeSelectLabel = styled.label`
  cursor: pointer;

  input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }

  input + * {
    display: block;
    width: 100%;
    opacity: 0.7;

    transition: all 0.25s ease;
  }

  input:checked + * {
    border-color: #373737 !important;
    opacity: 1;
  }
`;
