# Greets user

from flask import Flask, render_template, request, url_for, jsonify, send_file
import io
from PIL import Image
app = Flask(__name__)
import os


@app.route("/", methods=["GET", "POST"])
def Index():
    return render_template("index.html")

# Get 8 photos from folder photos/photo.jpg and return it
@app.route("/getPhotos", methods=["GET", "POST"])
def getPhotos():
    PhotoCount = request.args.get("PhotoCount")
    img_path = "photos/" + PhotoCount + ".jpg"
    
    # Open the image file
    try:
        img = Image.open(img_path)
        img_io = io.BytesIO()
        img.save(img_io, 'JPEG', quality=30)
        img_io.seek(0)
        return send_file(img_io, mimetype='image/jpeg')
    except:
        print("Unable to load image")
        return ""

@app.route("/getPhotoCount", methods=["GET", "POST"])
def getPhotoCount():
    dir = "photos/"
    count = len([name for name in os.listdir(dir) if os.path.isfile(os.path.join(dir, name))])
    print(count)
    return jsonify(count)
