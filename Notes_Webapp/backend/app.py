from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt


load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('secret_key')
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

client = MongoClient(os.getenv('Mongo-url'))

db = client['Notes-webapp-db']

bros_collection = db['bros']

@app.route('/', methods=['GET', 'OPTIONS'])
def main():
    return jsonify({'message': 'Running...'}), 200

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    rePassword = data.get('rePassword')

    find_data = bros_collection.find_one({'Email': email})

    if find_data and find_data['Username'] == username:
        return jsonify({'info': 'User already exists'}), 200
    elif bros_collection.find_one({'Username': username}):
        return jsonify({'problem': 'This username already exists bro'}), 401
    elif password != rePassword:
        return jsonify({'problem': 'BROOO! your password is not vibing with repeat password'}), 401
    
    Protected_password = bcrypt.hashpw(password.encode('UTF-8'), bcrypt.gensalt())
    
    data = bros_collection.insert_one({
        'Username': username,
        'Email': email,
        'Password': Protected_password,
        'IsVerified': False,
        'IsPremium': False,
        'Post': 'User',
        'Gender': None,
        'Profile_pic': 'https://res.cloudinary.com/dncscskiw/image/upload/v1754844516/xhppfftkzgxyfbf1ufo1.svg',
        'Theme': 'Banana'
    })

    if data:
        return jsonify({'success': 'Signup Successful'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('Username')
    password = data.get('Password')

    fetched_data = bros_collection.find_one({'Username': username})

    if not fetched_data:
        return jsonify({'failed': 'The Username is invalid'}), 401

    nerfed_password = fetched_data['Password']

    try:
        
        if bcrypt.checkpw(password.encode('UTF-8'), nerfed_password):
            return jsonify({
                'success':'login Successfull',
                'Username':fetched_data['Username'],
                'Email':fetched_data['Email'],
                'ProfilePicture':fetched_data['Profile_pic'],
                'Post':fetched_data['Post'],
                'Gender': fetched_data['Gender']
                }), 200 
        else:
            return jsonify({'failed':'The Username or Password is not valid'}), 401
        
    except Exception as e:
        print(e)
    
@app.route('/get_premium', methods=['GET'])
def get_premium():
    data = request.args
    username = data.get('username')

    fetch_data = bros_collection.find_one({'Username': username })

    try:
        if fetch_data:
            premium = fetch_data['IsPremium']
            return jsonify({'result': premium})
        else:
            return jsonify({'failed': 'something went wrong bruh!'})
        
    except Exception as e:
        print(e)
    
@app.route('/moment_of_truth', methods=['GET'])
def moment_of_truth():
    data = request.args
    username = data.get('username')

    fetch_data = bros_collection.find_one({'Username': username})
    if fetch_data:
        premium = fetch_data['IsPremium']
        verified = fetch_data['IsVerified']
        post = fetch_data['Post']
        return jsonify({
            'premium': premium,
            'verified': verified,
            'post': post
        })
    
# @app.route('/profile_pic', methods=['PUT'])
# def profile_pic():
#     return

if __name__  == '__main__':
    app.run(debug=True)