import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";

const useChipStyles = makeStyles(() => {
  return {
    root: props => {
      const color = props.selected
        ? props.selectedColor
        : props.unselectedColor;
      return {
        backgroundColor: color,
        "&:hover, &:focus": {
          backgroundColor: fade(color, 0.42)
        },
        color: props.textColor
      };
    }
  };
});

const MetricChip = props => {
  const {
    selected,
    metric,
    toggleSelected,
    selectedColor,
    unselectedColor,
    textColor
  } = props;
  const classes = useChipStyles({
    selected,
    selectedColor,
    unselectedColor,
    textColor
  });

  const onClick = useCallback(() => {
    toggleSelected(metric);
  }, [toggleSelected, metric]);

  return <Chip label={metric} className={classes.root} onClick={onClick} />;
};

MetricChip.defaultProps = {
  selectedColor: "#1976D2",
  unselectedColor: "#CFCFCF",
  textColor: "#FFFFFF"
};

MetricChip.propTypes = {
  metric: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedColor: PropTypes.string,
  unselectedColor: PropTypes.string,
  textColor: PropTypes.string,
  toggleSelected: PropTypes.func.isRequired
};

export default MetricChip;
