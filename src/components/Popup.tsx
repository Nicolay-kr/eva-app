import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Carusel from './Carusel';

import {
    changePopup,
} from '../store/mainSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks'
//   import { useDispatch } from 'react-redux';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
interface MainProps {
    children: React.ReactNode;
}


export default function Popup(props: MainProps) {
    // const isOpen = useAppSelector(state => state.popup.value)
    // const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
        // dispatch(changePopup(false));
        // console.log(isOpen)
    };
    const handleClose = () => {
        setOpen(false);
        // dispatch(changePopup(true));
        // console.log(isOpen)
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                {props.children}
            </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Confidential information
                </DialogTitle>
                <DialogContent dividers>
                    <div className="popupContent">
                        <Carusel />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}