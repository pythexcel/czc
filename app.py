from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)


@app.route('/webhook', methods=['POST'])
def handle_webhook():
    bot_id = request.args.get('b')
    openai_key = get_openai_key_from_database(bot_id)
    if openai_key:
        return jsonify({"message": "Webhook processed successfully"})
    else:
        return jsonify({"error": "Bot ID not found or invalid"})
    

def get_openai_key_from_database(bot_id):
    conn = sqlite3.connect('/root/python_projects/zuppychat/backend/db.sqlite3')
    cursor = conn.cursor()
    cursor.execute("SELECT open_ai_api_key FROM bot_botmodel WHERE id = ?", (bot_id,))
    row = cursor.fetchone()

    conn.close()

    if row:
        return row[0]
    else:
        return None



if __name__ == '__main__':
    app.run(port=5002, host="0.0.0.0")