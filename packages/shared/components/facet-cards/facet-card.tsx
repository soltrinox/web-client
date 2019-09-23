import classNames from "classnames";
import { FundFacet, ProgramFacet } from "gv-api-web";
import * as React from "react";
import ImageBase from "shared/components/avatar/image-base";
import Link from "shared/components/link/link";
import Surface from "shared/components/surface/surface";
import useIsOpen from "shared/hooks/is-open.hook";

import facetImg from "./facet.png";

const _FacetCard: React.FC<Props> = ({
  facet,
  composeFacetUrl,
  title,
  fileRoute
}) => {
  const [isHovered, setHovered, setNotHovered] = useIsOpen();
  return (
    <Surface
      className={classNames("surface--without-paddings facet", {
        "facet--hovered": isHovered
      })}
      onMouseEnter={setHovered}
      onMouseLeave={setNotHovered}
    >
      <Link
        to={{
          pathname: fileRoute,
          state: `/ ${title}`,
          as: composeFacetUrl(facet.url)
        }}
      >
        <div className="facet__facet-container">
          <div className="facet__logo-wrapper">
            <ImageBase
              url={facet.logo}
              alt={facet.title}
              defaultImage={facetImg}
              imageClassName="facet__logo"
            />
          </div>
          <div className="facet__info">
            <h2 className="facet__title">{facet.title}</h2>
            <div className="facet__description">{facet.description}</div>
          </div>
        </div>
      </Link>
    </Surface>
  );
};

interface Props {
  title: string;
  facet: FundFacet | ProgramFacet;
  composeFacetUrl: composeFacetUrlFunc;
  fileRoute: string;
}

export type composeFacetUrlFunc = (url: string) => string;

const FacetCard = React.memo(_FacetCard);
export default FacetCard;
