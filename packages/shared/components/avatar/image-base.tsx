import classNames from "classnames";
import * as React from "react";
import withUrl from "shared/decorators/with-url";

class _ImageBase extends React.Component<IImageBaseProps, State> {
  state = {
    error: false
  };
  handleError = (e: any) => {
    e.target.onerror = null;
    this.setState({ error: true });
  };
  render() {
    const {
      url,
      alt,
      defaultImage,
      imageClassName,
      defaultImageClassName
    } = this.props;
    const currentSrc = this.state.error || !url ? defaultImage : url;

    return (
      <img
        alt={alt}
        className={classNames(
          imageClassName,
          this.state.error || !url ? defaultImageClassName : ""
        )}
        src={currentSrc}
        onError={this.handleError}
      />
    );
  }
}

const ImageBase = withUrl("url")(_ImageBase);
export default ImageBase;

export interface IImageProps {
  url: string;
  alt: string;
  className?: string;
}

export interface IImageBaseProps {
  url: string;
  alt: string;
  defaultImage: string;
  imageClassName?: string;
  defaultImageClassName?: string;
}

interface State {
  error: boolean;
}
