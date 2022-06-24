import { Message} from 'semantic-ui-react';

interface messageProps {
  message: string;
}

const MessageAlert = ({message}: messageProps) => (
  <Message>
    {/* <Message.Header>Changes in Service</Message.Header> */}
    <p style={{color: 'red'}}>
      {message.indexOf('400') ? 'Email/Password is incorrect' : message}
    </p>
  </Message>
)

export default MessageAlert;