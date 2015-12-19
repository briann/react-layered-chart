import ActionType from './ActionType';

function hover(xPos) {
  return {
    type: ActionType.SET_HOVER,
    payload: xPos
  };
}

// factor should be around 1 for smooth zooming
// focus must be on [0, 1]
function zoom(factor, focus = 0.5) {
  return (dispatch, getState) => {
    const currentXAxis = getState().xAxis;
    const currentExtent = currentXAxis.end - currentXAxis.start;
    const targetExtent = currentExtent * factor;
    const extentDelta = currentExtent - targetExtent;

    const payload = {
      start: currentXAxis.start - extentDelta * focus,
      end: currentXAxis.end + extentDelta * (1 - focus)
    };

    dispatch({
      type: ActionType.SET_X_AXIS,
      payload
    });
  };
}

function pan(delta) {
  return (dispatch, getState) => {
    const currentXAxis = getState().xAxis;

    const payload = {
      start: currentXAxis.start + delta,
      end: currentXAxis.end + delta
    };

    dispatch({
      type: ActionType.SET_X_AXIS,
      payload
    });
  };
}

function brush(brushExtent) {
  return {
    type: ActionType.SET_SELECTION,
    payload: brushExtent
  };
}

export default {
  zoom,
  pan,
  brush,
  hover
};