import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { MdClose, MdKeyboardArrowUp } from "react-icons/md"

import {
  breakpoints,
  dimensions,
  colors,
  radius,
  spacing,
  fontSizes,
} from "../../utils/styles"

const CommunityCaptionRoot = styled(`div`)`
  bottom: ${spacing.xl};
  bottom: calc(${dimensions.pictureBrowserAction.heightMobile} + ${spacing.md});
  color: ${colors.lightest};
  cursor: default;
  display: ${(props) => (props.superZoom ? `none` : `block`)};
  left: ${spacing.md};
  position: fixed;
  right: ${spacing.md};

  @media (min-width: ${breakpoints.desktop}px) {
    right: auto;
    bottom: ${spacing.lg};
    left: calc(50% + (${dimensions.pictureBrowserAction.widthDesktop} / 2));
    max-width: 500px;
    transform: translateX(-50%);
  }
`

const Toggle = styled(`button`)`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: ${radius.lg}px ${radius.lg}px 0 0;
  cursor: pointer;
  display: flex;
  height: 46px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 46px;

  svg {
    width: 36px;
    height: 36px;
    color: ${colors.lightest};
  }
`

const Caption = styled(`div`)`
  background: rgba(0, 0, 0, 0.7);
  border-radius: ${radius.lg}px ${radius.lg}px 0 0;
  font-size: ${fontSizes.md};
  padding: ${spacing.sm} ${spacing.lg};
  padding-right: calc(${spacing.lg} + 46px);
  width: 100%;

  p {
    margin: 0;
  }

  .minimized & {
    border-radius: ${radius.lg}px 0 0 ${radius.lg}px;
  }
`

const UserPhotoHint = styled(`div`)`
  background: rgba(68, 34, 102, 0.9);
  border-radius: 0 0 ${radius.lg}px ${radius.lg}px;
  cursor: pointer;
  font-size: ${fontSizes.sm};
  padding: ${spacing.sm} ${spacing.lg};
  position: relative;
  width: 100%;

  .minimized & {
    display: none;
  }

  span:last-child {
    display: none;
  }

  &.expanded {
    span:last-child {
      display: inline;
    }
    strong {
      display: none;
    }
  }

  a {
    color: inherit;
  }
`

class CommunityCaption extends Component {
  state = {
    minimized: false,
    incentiveExpanded: false,
  }

  toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    this.setState((state) => {
      return {
        minimized: !state.minimized,
        hintExpanded: false,
      }
    })
  }

  toggleIncentive = (e) => {
    if (!e.target.href) {
      e.preventDefault()
      e.stopPropagation()

      this.setState((state) => {
        return { hintExpanded: !state.hintExpanded }
      })
    }
  }

  render() {
    const { caption, superZoom } = this.props
    const { minimized, hintExpanded } = this.state

    return (
      <CommunityCaptionRoot
        superZoom={superZoom}
        className={minimized ? `minimized` : ``}
      >
        <Caption>
          {minimized ? (
            <p>Show caption</p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: caption }} />
          )}
        </Caption>
        <UserPhotoHint
          onClick={this.toggleIncentive}
          className={hintExpanded ? `expanded` : ``}
        >
          <span>We want to see your Gatsby swag photos!</span>
          {` `}
          <strong>Read more...</strong>
          <span>
            Upload your photos to{` `}
            <a href="https://github.com/gatsbyjs/store.gatsbyjs.org/issues/143">
              the official photo sharing issue
            </a>
            {` `}
            and it may be featured in the store!
          </span>
        </UserPhotoHint>
        <Toggle onClick={this.toggle}>
          {minimized ? <MdKeyboardArrowUp /> : <MdClose />}
        </Toggle>
      </CommunityCaptionRoot>
    )
  }
}

CommunityCaption.propTypes = {
  caption: PropTypes.string.isRequired,
  superZoom: PropTypes.bool.isRequired,
}

export default CommunityCaption
