from flask import Flask, render_template, request
from Motor import setup, motor_backward, motor_forward, stop, destroy


setup()
app = Flask(__name__)
total_angle = 0


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


@app.route('/forward')
def forward():
    angle = int(float(request.args.get("angle", "")))
    global total_angle
    total_angle += angle
    motor_forward(4*angle)
    stop()
    return 'success'


@app.route('/backward')
def backward():
    angle = int(float(request.args.get("angle", "")))
    global total_angle
    total_angle -= angle
    motor_backward(4*angle)
    stop()
    return 'success'


if __name__ == '__main__':
    try:
        app.run(host='127.0.0.1', port=5005, threaded=True)
    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child function destroy() will be  executed.
        motor_backward(4 * total_angle)
        destroy()
