import styled from 'styled-components';

const TableComponent = styled.div`
    pointer-events: ${props => props.pointerEvents};
    opacity: ${props => props.opacity};
`;

export default TableComponent