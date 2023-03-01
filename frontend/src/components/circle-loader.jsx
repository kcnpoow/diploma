import styled from 'styled-components';

const Loader = styled.div`
  ${({ loaderSize, lineWidth, truckColor, thumbColor }) => `
    width: ${loaderSize}px;
    height: ${loaderSize}px;
    border: ${lineWidth}px solid ${truckColor};
    border-top-color: ${thumbColor};    
    border-radius: 50%;
    animation: spin 1s linear infinite;
  
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
  
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

const CircleLoader = ({
  loaderSize = 16,
  lineWidth = 2,
  truckColor = 'white',
  thumbColor = 'black',
}) => {
  return (
    <Loader
      loaderSize={loaderSize}
      lineWidth={lineWidth}
      truckColor={truckColor}
      thumbColor={thumbColor}
    />
  );
};

export default CircleLoader;
