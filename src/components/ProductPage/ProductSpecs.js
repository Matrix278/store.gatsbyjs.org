import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../utils/styles';

const ProductSpecsRoot = styled(`div`)`
  padding: 0 ${spacing.md}px;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  }
`;

const Name = styled(`h1`)`
  color: ${colors.text};
  font-family: ${fonts.heading};
  font-size: ${fontSizes['2xl']};
  font-weight: ${fontWeights.bold};
  line-height: 1.125;
  margin: 0;
`;

const Description = styled(`p`)`
  color: ${colors.text};
  font-size: ${fontSizes.md};
  line-height: ${lineHeights.default};
`;

const Price = styled(`div`)`
  color: ${colors.brand};
  font-size: ${fontSizes['xl']};
  font-weight: ${fontWeights.semibold};
  letter-spacing: -0.02em;

  span {
    color: ${colors.textLight};
  }
`;

const removeCareInstructions = desc =>
  desc.split(/Care Instructions/).slice(0, 1);

const ProductSpecs = props => {
  const {
    product: {
      title,
      description,
      variants: [variant]
    }
  } = props;

  const { price } = variant;

  return (
    <ProductSpecsRoot>
      <Name>{title}</Name>
      <Description>{removeCareInstructions(description)}</Description>
      <Price>
        <span>USD</span> ${price}
      </Price>
    </ProductSpecsRoot>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductSpecs;
