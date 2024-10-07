from ultralytics import YOLO
import cv2
import cvzone
import math


model = YOLO("./runs/detect/train13/weights/best.pt")

classNames = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six"
]

img = cv2.imread("./datasets/Images/train/images/IMG_20191208_112710.jpg")
resized_img = cv2.resize(img, (640,640))
results = model(resized_img)
cv2.imshow("original_image", resized_img)
for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2-x1, y2-y1
            cvzone.cornerRect(resized_img, (x1, y1, w, h), colorR=(145,85,39))

            conf = math.ceil((box.conf[0]*100))/100

            cls = box.cls[0]
            name = classNames[int(cls)]

            cvzone.putTextRect(resized_img,
                               f'{name} 'f'{conf}',
                               (max(0,x1), max(35,y1)),
                               scale = 1,
                               thickness=1,
                               font=cv2.FONT_HERSHEY_PLAIN,
                               colorT=(250,250,250),
                               colorR=(145,85,39),
                               offset=4)

cv2.imshow("detected_dice", resized_img)
cv2.waitKey(0)
cv2.destroyAllWindows()