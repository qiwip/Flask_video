import RPi.GPIO as GPIO
import time

IN1 = 11
IN2 = 12
IN3 = 13
IN4 = 15


def setStep(w1, w2, w3, w4):
    GPIO.output(IN1, w1)
    GPIO.output(IN2, w2)
    GPIO.output(IN3, w3)
    GPIO.output(IN4, w4)


def stop():
    setStep(0, 0, 0, 0)


def motor_forward(steps):
    for i in range(0, steps):
        setStep(1, 0, 0, 0)
        time.sleep(0.003)
        setStep(0, 1, 0, 0)
        time.sleep(0.003)
        setStep(0, 0, 1, 0)
        time.sleep(0.003)
        setStep(0, 0, 0, 1)
        time.sleep(0.003)


def motor_backward(steps):
    for i in range(0, steps):
        setStep(0, 0, 0, 1)
        time.sleep(0.003)
        setStep(0, 0, 1, 0)
        time.sleep(0.003)
        setStep(0, 1, 0, 0)
        time.sleep(0.003)
        setStep(1, 0, 0, 0)
        time.sleep(0.003)


def setup():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)  # Numbers GPIOs by physical location
    GPIO.setup(IN1, GPIO.OUT)  # Set pin's mode is output
    GPIO.setup(IN2, GPIO.OUT)
    GPIO.setup(IN3, GPIO.OUT)
    GPIO.setup(IN4, GPIO.OUT)


def destroy():
    GPIO.cleanup()  # Release resource
