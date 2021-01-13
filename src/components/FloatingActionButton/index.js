import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import { withRouter } from "react-router-dom";
import './style.scss'
import { Trans } from 'react-i18next'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
class FloatingActionButton extends Component {

  render(){
    const { color, icon, type, loading, success, disabled, tooltip, variant, className } = this.props
    const realDisabled = disabled || loading
    const button = <Fab  variant={variant} color={color} type={type} onClick={this.handleOnClick} disabled={realDisabled} className={success ? 'success' : ''}>
      {success ? <CheckOutlinedIcon id="checkOutlinedIcon" /> : icon}
    </Fab>

    return(
      <div className={'fabButton ' + className}>
        {tooltip && !realDisabled ?
          <Tooltip  classes={{tooltip:"tooltip"}} title={<Trans>{tooltip}</Trans>} placement="top">{button}</Tooltip>
          :
          button
        }
        {loading && <CircularProgress size={68} className='progress' />}
      </div>
    )
  }

  handleOnClick = () =>{
    const { onClick, href } = this.props
    if(typeof onClick === 'function') onClick()
    else if(href){
      this.props.history.push(href);
      //this.context.push(href)
    }
  }

  static propTypes = {
    color: PropTypes.string,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    success: PropTypes.bool,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    variant: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    color: 'primary',
    classes: {},
    disabled: false, 
    href: "",
    loading: false,    
    success: false,
    tooltip: "",
    type: "submit",
    icon: <AddOutlinedIcon  />,
    variant: "round",
  }

}

FloatingActionButton = withRouter(FloatingActionButton)
export default FloatingActionButton