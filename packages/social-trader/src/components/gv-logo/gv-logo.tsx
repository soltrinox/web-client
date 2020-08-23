import * as React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
  display: inline-block;
  height: 28px;
  width: 50px;
  background-size: contain;
`;

const GVLogo: React.FC = () => {
  return (
    <StyledSvg
      width="51"
      height="29"
      viewBox="0 0 51 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50.3316 3.08575C50.3316 17.0705 39.042 28.4483 25.1656 28.4483C11.2896 28.4483 0 17.0705 0 3.08575C0 2.0411 0.0627803 1.01151 0.18671 0H4.70743C4.55823 1.00713 4.4805 2.03808 4.4805 3.08575C4.4805 14.5808 13.7598 23.9325 25.1656 23.9325C36.0476 23.9325 44.9952 15.4192 45.7943 4.6541H13.8002C14.5618 10.2896 19.3678 14.647 25.1656 14.647C29.6538 14.647 33.5489 12.0354 35.4323 8.24108H40.2759C38.14 14.5854 32.1718 19.1625 25.1656 19.1625C16.3704 19.1625 9.21348 11.9497 9.21348 3.08575C9.21348 2.03042 9.31512 0.999458 9.50917 0H50.1449C50.2688 1.01151 50.3316 2.0411 50.3316 3.08575Z"
        fill="#16B9AD"
      />
    </StyledSvg>
  );
};

export default GVLogo;
