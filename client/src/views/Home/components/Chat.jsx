import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from "../../../Context/WebSocketContext";
import { jsonToString, stringToJson } from '../../../lib/utils';

function ChatBox() {
	const webSocket = useWebSocket();

	const [name, setName] = useState('');
	const [chatMessage, setChatMessage] = useState([]);
	const [message, setMessage] = useState('');

	const onMessage = useCallback(async (event) => {
		const newMessageToString = await event.data.text();
		const newMessageToJSON = stringToJson(newMessageToString);

		setChatMessage((prevState) => {
			const newChatMessage = [newMessageToJSON, ...prevState];

			return newChatMessage;
		});
	}, []);

	useEffect(() => {
		webSocket.addEventListener('message', onMessage);	

		return () => {
			webSocket.removeEventListener('message', onMessage);
		};
	}, [webSocket, onMessage]);

	const onInputNameChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const onInputMessageChange = (e) => {
		e.preventDefault();
		setMessage(e.target.value);
	};

	const sendMessage = () => {
		const data = {
			username: name,
			body: message,
			time: new Date()
		};
		const dataToString = jsonToString(data);

		webSocket.send(dataToString);
		setMessage("");
	}

	const handleKeypress = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	const dateToTime = (time) => {
		const date = new Date(time);
		return date.toLocaleTimeString(navigator.language, {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	return (
		<>
			<h1>Messagerie instantanée</h1>
			<div>
				<input
					type='text'
					className='input-name'
					placeholder='Votre pseudo ...'
					value={name}
					onChange={onInputNameChange}
				/>
			</div>
			<div className='chat-box'>
				<div className='messages'>
					{chatMessage &&
						chatMessage.map((message, index) => (
							<div key={index} className='message'>
								<p>
									<span className='username'>{message.username}</span> - <span className='time'>{dateToTime(message.time)}</span>
								</p>
								<p>
									{message.body}
								</p>
							</div>
						))}
				</div>
				<div className='action'>
					<input
						type='text'
						className='input-message'
						placeholder='Votre message ...'
						value={message}
						onChange={onInputMessageChange}
						onKeyPress={handleKeypress}
					/>
					<button className='button-message' onClick={() => sendMessage()}>
						Envoyer
					</button>
				</div>
			</div>
		</>
	);
}

export default ChatBox;
