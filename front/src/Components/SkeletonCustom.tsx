import Skeleton, {SkeletonProps} from "react-loading-skeleton";
import {FC} from "react";

const SkeletonCustom: FC<SkeletonProps> = ({...props}) => {
    const baseColor = "black";
    const highlightColor = "white";
    return (<Skeleton baseColor={baseColor} highlightColor={highlightColor} {...props}/>);
};

export default SkeletonCustom;
