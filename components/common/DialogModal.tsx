import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

export interface DialogProps {
  open: boolean
  close: () => void
  children: React.ReactNode
}
const DialogModal: React.FC<DialogProps> = (props) => {
  const { open, close, children } = props
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          password変更のためメール送信
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            { children }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogModal
