import dotenv from 'dotenv';
import connectDB from '../../connectDB';
import MessageModel from '../models/message.model';


class MessageController {
  static sendNewMessage(req, res) {
    const {
      subject,
      message
    } = req.body;

    const query = `INSERT INTO messages (subject, message)
                    VALUES('${subject}','${message}' ) returning * `;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount >= 1) {
          return res.status(200).send({ status: 200, message: 'Message created successfully', data: result.rows[0] });
        }
        return res.status(500).send({ staus: 500, message: 'Message could not be sent' });
      })
      .catch((error) => {
        res.status(500).send({ status: 500, message: 'Error sending message' });
      });
  }

  static getAllMessages(req, res) {
    const query = 'SELECT * FROM messages';
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(400).send({ status: 400, error: 'There are no messages' });
        }
        return res.status(200).send({ message: 'Messages were successfully retrieved', data: result.rows });
      })
      .catch((error) => {
        res.status(500).send({ status: 500, error: 'Error fetching all messages' });
      });
  }

  static getSpecificMessage(req, res) {
    const query = `SELECT * FROM messages WHERE id=${req.params.id}`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(400).send({ status: 400, error: 'Message does not exist' });
        }
        return res.status(200).send({ message: 'Message successfully retrieved', data: result.rows[0] });
      })
      .catch((error) => {
        res.status(500).send({ status: 500, error: 'Error fetching the specific message' });
      });
  }

  static getUnreadMessages(req, res) {
    const query = `SELECT * FROM messages WHERE status=${req.params.status}`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(400).send({ status: 400, error: 'Message does not exist' });
        }
        return res.status(200).send({ message: 'Message successfully retrieved unread messages', data: result.rows });
      })
      .catch((error) => {
        res.status(500).send({ status: 500, error: 'Error fetching unread message(s)' });
      });
  }

  static getSentMessages(req, res) {
    const sentMessages = MessageModel.fetchSentMessages();
    if (sentMessages.length === 0) {
      return res.status(404).send({ message: 'Sorry, there are no sent messages' });
    }
    return res.status(200).send({
      status: res.statusCode,
      message: 'Fetched all sent Messages successfully',
      sentMessages
    });
  }

  static deleteSpecificMessage(req, res) {
    const query = `SELECT * FROM messages WHERE id=${req.params.id}`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(400).send({ status: 400, error: 'Message does not exist' });
        }
        const deleteQuery = `DELETE FROM messages WHERE id=${result.rows[0].id}`;
        return connectDB.query(deleteQuery)
          .then(() => res.status(200).send({ message: 'Message successfully deleted', data: result.rows[0] }))
          .catch((error) => {
            res.status(500).send({ status: 500, error: 'Error deleting the specific message' });
          });
      })
      .catch((error) => {
        res.status(500).send({ status: 500, error: 'Error deleting the specific message' });
      });
  }
}

export default MessageController;
