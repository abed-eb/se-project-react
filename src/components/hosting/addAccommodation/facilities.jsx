import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import beach_icon from "../../../assets/img/beach.png";
import hairD from "../../../assets/img/hairdryer.png";
import "./facilities.css";
import { toast } from "react-toastify";

class Facilities extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.save = this.save.bind(this);
  }

  state = {
    facilities: [
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="washer"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 446 512"
            className="svg-inline--fa fa-washer fa-w-14 fa-9x"
          >
            <path
              fill="currentColor"
              d="M384-1H64A64 64 0 0 0 0 63v416a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V63a64 64 0 0 0-64-64zm32 480H32V63a32 32 0 0 1 32-32h320a32 32 0 0 1 32 32zM80 95a16 16 0 1 0-16-16 16 16 0 0 0 16 16zm64 0a16 16 0 1 0-16-16 16 16 0 0 0 16 16zm80 32a160 160 0 1 0 160 160 160 160 0 0 0-160-160zm0 288a128 128 0 1 1 128-128 128.14 128.14 0 0 1-128 128zm36.87-131.66a51.23 51.23 0 0 1-73.74 0A51.81 51.81 0 0 1 150 299c-7.71 0-14.74-2.15-21.31-5.16C132.27 343.53 173.41 383 224 383s91.73-39.47 95.31-89.16c-6.57 3-13.6 5.16-21.31 5.16a51.81 51.81 0 0 1-37.13-15.66z"
              className=""
            />
          </svg>
        ),
        id: 0,
        label: "Washing machine",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="air-conditioner"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="svg-inline--fa fa-air-conditioner fa-w-18 fa-9x"
          >
            <path
              fill="currentColor"
              d="M544,0H32A32,32,0,0,0,0,32V192a32,32,0,0,0,32,32H544a32,32,0,0,0,32-32V32A32,32,0,0,0,544,0Zm0,192H32V32H544ZM72,160H504a8,8,0,0,0,8-8V136a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8v16A8,8,0,0,0,72,160ZM224,424a56,56,0,0,1-56,56H152a56.09,56.09,0,0,1-54.79-67.76c5.36-26.18,29.68-44.24,56.4-44.24H168a8,8,0,0,0,8-8V344a8,8,0,0,0-8-8H152a88.09,88.09,0,0,0-87.57,96.78C68.88,478.5,110,512,155.91,512H168a88,88,0,0,0,88-88V256H224ZM420.1,304H408a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8h16a56.09,56.09,0,0,1,54.79,67.76c-5.36,26.18-29.68,44.24-56.4,44.24H408a56,56,0,0,1-56-56V256H320V392a88,88,0,0,0,88,88h16a88.09,88.09,0,0,0,87.57-96.78C507.12,337.5,466,304,420.1,304Z"
              className=""
            />
          </svg>
        ),
        id: 1,
        label: "Air-conditioner",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="air-conditioner"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <image href={hairD} />
          </svg>
        ),
        id: 2,
        label: "Hair dryer",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="refrigerator"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="svg-inline--fa fa-refrigerator fa-w-12 fa-9x"
          >
            <path
              fill="currentColor"
              d="M336,0H48A48,48,0,0,0,0,48V464a48,48,0,0,0,48,48H336a48,48,0,0,0,48-48V48A48,48,0,0,0,336,0Zm16,464a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V192H256V376a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V192h64Zm0-304H288V104a8,8,0,0,0-8-8H264a8,8,0,0,0-8,8v56H32V48A16,16,0,0,1,48,32H336a16,16,0,0,1,16,16Z"
              className=""
            />
          </svg>
        ),
        id: 3,
        label: "Refrigerator",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="phone-rotary"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-phone-rotary fa-w-16 fa-9x"
          >
            <path
              fill="currentColor"
              d="M256 240a80 80 0 1 0 80 80 80 80 0 0 0-80-80zm0 128a48 48 0 1 1 48-48 48.05 48.05 0 0 1-48 48zm114.43-175.75A64 64 0 0 0 314.86 160H197.14a64 64 0 0 0-55.57 32.25L36.21 376.62A32 32 0 0 0 32 392.5V448a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32v-55.5a32 32 0 0 0-4.21-15.88zM448 448H64v-55.5l105.36-184.38A32.07 32.07 0 0 1 197.14 192h117.72a32.07 32.07 0 0 1 27.78 16.12L448 392.5zm52.27-329.8C431.72 63.21 344.81 32 256 32S80.28 63.21 11.73 118.2A32.17 32.17 0 0 0 0 143.29V208a16 16 0 0 0 16 16h70.11a16 16 0 0 0 14.31-8.85L128 152c39.9-17.28 83.23-24 128-24 44.77 0 88.08 6.72 128 24l27.58 63.15a16 16 0 0 0 14.31 8.85H496a16 16 0 0 0 16-16v-64.71a32.17 32.17 0 0 0-11.73-25.09zM480 192h-43.61l-23.07-52.81-5-11.55-11.57-5C355.33 104.71 309.3 96 256 96s-99.32 8.71-140.71 26.63l-11.57 5-5 11.55L75.61 192H31.94l-.18-48.84A359.7 359.7 0 0 1 256 64a357.89 357.89 0 0 1 224 79.29z"
              className=""
            />
          </svg>
        ),
        id: 4,
        label: "Phone",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="hdd"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="svg-inline--fa fa-hdd fa-w-18 fa-9x"
          >
            <path
              fill="currentColor"
              d="M566.819 227.377L462.377 83.768A48.001 48.001 0 0 0 423.557 64H152.443a47.998 47.998 0 0 0-38.819 19.768L9.181 227.377A47.996 47.996 0 0 0 0 255.609V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V255.609a47.996 47.996 0 0 0-9.181-28.232zM139.503 102.589A16.048 16.048 0 0 1 152.443 96h271.115c5.102 0 9.939 2.463 12.94 6.589L524.796 224H51.204l88.299-121.411zM544 272v128c0 8.823-7.178 16-16 16H48c-8.822 0-16-7.177-16-16V272c0-8.837 7.163-16 16-16h480c8.837 0 16 7.163 16 16zm-56 64c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24zm-64 0c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"
              className=""
            />
          </svg>
        ),
        id: 5,
        label: "Safe",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="hat-chef"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-hat-chef fa-w-16 fa-9x"
          >
            <path
              fill="currentColor"
              d="M416 32a95.17 95.17 0 0 0-57.73 19.74C334.93 20.5 298 0 256 0s-78.93 20.5-102.27 51.74A95.56 95.56 0 0 0 0 128c0 41.74 64 224 64 224v128a32 32 0 0 0 32 32h320a32 32 0 0 0 32-32V352s64-182.26 64-224a96 96 0 0 0-96-96zm0 448H96v-96h320zm0-128h-44.09L384 201.25a8 8 0 0 0-7.33-8.61l-16-1.28h-.65a8 8 0 0 0-8 7.37L339.8 352h-68.46V200a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v152H172.2l-12.27-153.3a8 8 0 0 0-8-7.37h-.65l-16 1.28a8 8 0 0 0-7.33 8.61L140.09 352H96S32 150.7 32 128a64.07 64.07 0 0 1 64-64 63.22 63.22 0 0 1 38.39 13.24l25.68 19.48 19.3-25.83C197.83 46.18 225.77 32 256 32s58.17 14.18 76.63 38.89l19.3 25.83 25.68-19.48A63.22 63.22 0 0 1 416 64a64.07 64.07 0 0 1 64 64c0 22.7-64 224-64 224z"
              className=""
            />
          </svg>
        ),
        id: 6,
        label: "Cooking basics",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="tv"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="svg-inline--fa fa-tv fa-w-20 fa-9x"
          >
            <path
              fill="currentColor"
              d="M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h256v64H136a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H336v-64h256a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm16 368a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16z"
              className=""
            />
          </svg>
        ),
        id: 7,
        label: "TV",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="couch"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="svg-inline--fa fa-couch fa-w-20 fa-9x"
          >
            <path
              fill="currentColor"
              d="M576 193.9v-33.7c0-53.1-43-96.2-96-96.2H160c-53 0-96 43.1-96 96.2v33.7c-36.5 7.5-64 39.8-64 78.6 0 25.1 12.1 48.8 32 63.8v79.6c0 17.7 14.3 32.1 32 32.1h64c17.3 0 31.3-14.7 31.8-32h320.4c.5 17.3 14.5 32 31.8 32h64c17.7 0 32-14.4 32-32.1v-79.6c19.9-15.1 32-38.7 32-63.8 0-38.7-27.5-71.1-64-78.6zm-448 222H64v-97.4c-17.1-10-32-21.1-32-46 0-26.5 21.5-48.1 48-48.1h32c8.8 0 16 7.2 16 16v175.5zM480 384H160v-95.5h320V384zm0-143.6V256H160v-15.6c0-26.5-21.5-48.1-48-48.1H96v-32.1c0-35.4 28.7-64.1 64-64.1h320c35.3 0 64 28.8 64 64.1v32.1h-16c-26.5 0-48 21.6-48 48.1zm96 78.1v97.4h-64V240.4c0-8.8 7.2-16 16-16h32c26.5 0 48 21.6 48 48.1 0 23.9-13.9 35.4-32 46z"
              className=""
            />
          </svg>
        ),
        id: 8,
        label: "Furniture",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="tint"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
            className="svg-inline--fa fa-tint fa-w-11 fa-9x"
          >
            <path
              fill="currentColor"
              d="M205.22 22.09C201.21 7.53 188.61 0 175.97 0c-12.35 0-24.74 7.2-29.19 22.09C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 480c-79.4 0-144-65.54-144-146.09 0-48.36 23-81.32 54.84-126.94 29.18-41.81 65.34-93.63 89.18-170.91 23.83 77.52 60.06 129.31 89.3 171.08C297.06 252.52 320 285.3 320 333.91 320 414.46 255.4 480 176 480zm0-64c-44.12 0-80-35.89-80-80 0-8.84-7.16-16-16-16s-16 7.16-16 16c0 61.75 50.25 112 112 112 8.84 0 16-7.16 16-16s-7.16-16-16-16z"
              className=""
            />
          </svg>
        ),
        id: 9,
        label: "Hot water",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="microwave"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-microwave fa-w-16 fa-9x"
          >
            <path
              fill="currentColor"
              d="M464,64H48A48,48,0,0,0,0,112V368a48,48,0,0,0,48,48h0l24,32h48l24-32H368l24,32h48l24-32h0a48,48,0,0,0,48-48V112A48,48,0,0,0,464,64ZM384,352H64V128H384Zm64-72a24,24,0,1,1,24-24A24,24,0,0,1,448,280Zm0-96a24,24,0,1,1,24-24A24,24,0,0,1,448,184Z"
              className=""
            />
          </svg>
        ),
        id: 10,
        label: "Microwave",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="swimming-pool"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="svg-inline--fa fa-swimming-pool fa-w-20 fa-9x"
          >
            <path
              fill="currentColor"
              d="M632 448h-24c-26.04 0-45.8-8.42-56.09-17.9-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C461.8 439.58 442.04 448 416 448s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C269.8 439.58 250.04 448 224 448s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C77.8 439.58 58.04 448 32 448H8c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h24c38.62 0 72.72-12.19 96-31.84 23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84h24c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zm-440-39.79V256h224v160c16.38 0 26.97-4.45 32-7.79V112c0-26.47 21.53-48 48-48s48 21.53 48 48v8c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-8c0-44.11-35.88-80-80-80s-80 35.89-80 80v112H192V112c0-26.47 21.53-48 48-48s48 21.53 48 48v8c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-8c0-44.11-35.88-80-80-80s-80 35.89-80 80v276.5c10.41 3.73 20.44 9.62 29.61 18.07.5.47 1.55 1.08 2.39 1.64z"
              className=""
            />
          </svg>
        ),
        id: 11,
        label: "Pool",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="car-garage"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="svg-inline--fa fa-car-garage fa-w-20 fa-9x"
          >
            <path
              fill="currentColor"
              d="M635.88 160L327.78 2.02c-4.88-2.69-10.69-2.69-15.56 0l-308.1 161c-3.87 2.15-5.26 7.02-3.11 10.88l7.78 13.99c2.15 3.86 7.02 5.25 10.88 3.1L320 34.3l300.33 153.68c3.86 2.14 8.73.76 10.87-3.1l7.79-13.99c2.15-3.87.76-8.74-3.11-10.89zm-142.5 101.74l-15.15-46.5c-10.73-32.93-41.43-55.22-76.07-55.22H237.83c-34.64 0-65.34 22.29-76.07 55.22l-15.15 46.5C117.01 273.47 96 302.22 96 336v128c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48v-16h224v16c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48V336c0-33.78-21.01-62.53-50.62-74.26zm-301.19-36.59a47.888 47.888 0 0 1 45.64-33.13h164.34c20.84 0 39.18 13.32 45.64 33.13L457.86 256H182.14l10.05-30.85zM176 464c0 8.83-7.19 16-16 16h-16c-8.81 0-16-7.17-16-16v-16h48v16zm336 0c0 8.83-7.19 16-16 16h-16c-8.81 0-16-7.17-16-16v-16h48v16zm0-80v32H128v-80c0-26.47 21.53-48 48-48h288c26.47 0 48 21.53 48 48v48zm-72.8-71.99c-24.1 0-55.2 23.24-55.2 47.93 0 11.98 5.85 32.07 45.06 32.07l10.14-.1c25.96 0 44.8-16.8 44.8-39.95 0-23.15-18.84-39.95-44.8-39.95zm0 55.9c-3.12 0-6.63.1-10.14.1-10.53 0-21.06-.9-21.06-8.07 0-9.57 18.72-23.93 31.2-23.93s20.8 6.38 20.8 15.95-8.33 15.95-20.8 15.95zm-238.4-55.9c-25.96 0-44.8 16.8-44.8 39.95 0 23.15 18.84 39.95 44.8 39.95l10.14.1c39.21 0 45.06-20.1 45.06-32.07 0-24.69-31.1-47.93-55.2-47.93zm10.14 56c-3.51 0-7.02-.1-10.14-.1-12.48 0-20.8-6.38-20.8-15.95s8.32-15.95 20.8-15.95 31.2 14.36 31.2 23.93c0 7.17-10.53 8.07-21.06 8.07z"
              className=""
            />
          </svg>
        ),
        id: 12,
        label: "Parking",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="wifi"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="svg-inline--fa fa-wifi fa-w-20 fa-9x"
          >
            <path
              fill="currentColor"
              d="M320 320c-44.18 0-80 35.82-80 80 0 44.19 35.83 80 80 80 44.19 0 80-35.84 80-80 0-44.18-35.82-80-80-80zm0 128c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48zm316.21-290.05C459.22-9.9 180.95-10.06 3.79 157.95c-4.94 4.69-5.08 12.51-.26 17.32l5.69 5.69c4.61 4.61 12.07 4.74 16.8.25 164.99-156.39 423.64-155.76 587.97 0 4.73 4.48 12.19 4.35 16.8-.25l5.69-5.69c4.81-4.81 4.67-12.63-.27-17.32zM526.02 270.31c-117.34-104.48-294.86-104.34-412.04 0-5.05 4.5-5.32 12.31-.65 17.2l5.53 5.79c4.46 4.67 11.82 4.96 16.66.67 105.17-93.38 264-93.21 368.98 0 4.83 4.29 12.19 4.01 16.66-.67l5.53-5.79c4.65-4.89 4.38-12.7-.67-17.2z"
              className=""
            />
          </svg>
        ),
        id: 13,
        label: "Wifi",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="oven"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="svg-inline--fa fa-oven fa-w-14 fa-9x"
          >
            <path
              fill="currentColor"
              d="M384,0H64A64,64,0,0,0,0,64V480a32,32,0,0,0,32,32H416a32,32,0,0,0,32-32V64A64,64,0,0,0,384,0Zm32,480H32V160H416Zm0-352H32V64A32,32,0,0,1,64,32H384a32,32,0,0,1,32,32ZM368,64a16,16,0,1,0,16,16A16,16,0,0,0,368,64Zm-64,0a16,16,0,1,0,16,16A16,16,0,0,0,304,64ZM144,64a16,16,0,1,0,16,16A16,16,0,0,0,144,64ZM80,64A16,16,0,1,0,96,80,16,16,0,0,0,80,64Zm0,384H368a16,16,0,0,0,16-16V208a16,16,0,0,0-16-16H80a16,16,0,0,0-16,16V432A16,16,0,0,0,80,448ZM96,224H352V416H96Zm208,32H144a16,16,0,0,0,0,32H304a16,16,0,0,0,0-32Z"
              className=""
            />
          </svg>
        ),
        id: 14,
        label: "Oven",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="fireplace"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="svg-inline--fa fa-fireplace fa-w-20 fa-9x"
          >
            <path
              fill="currentColor"
              d="M624 0H16C7.2 0 0 7.2 0 16v96c0 8.8 7.2 16 16 16h16v352c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V358.9c0-83.6 61.1-158.2 144.3-166.1 5.3-.5 10.5-.8 15.7-.8 88.4 0 160 71.6 160 160v128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V128h16c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zm-48 480h-64V352c0-105.9-86.1-192-192-192-6.2 0-12.4.3-18.8.9-97.1 9.3-173.2 96.2-173.2 198V480H64V128h512v352zm32-384H32V32h576v64zM342.3 311.6c-14-18.8-31.4-37.8-51.1-55.6-50.5 45.6-86.4 105-86.4 140.8 0 63.6 51.6 115.2 115.2 115.2s115.2-51.6 115.2-115.2c0-26.6-26.7-81.6-64-115.2-10.7 9.6-20.4 19.8-28.9 30zM320 480c-45.9 0-83.2-37.3-83.2-83.2 0-19.6 20.4-58.9 54.5-96 9.3 9.8 17.8 19.9 25.3 29.9l24.2 32.4 26-30.9 3.6-4.2c20.5 26.9 32.8 57.4 32.8 68.8 0 45.9-37.3 83.2-83.2 83.2z"
              className=""
            />
          </svg>
        ),
        id: 15,
        label: "Fireplace",
      },
      {
        src: (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="toilet"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="svg-inline--fa fa-toilet fa-w-12 fa-9x"
          >
            <path
              fill="currentColor"
              d="M376 32c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8H8C3.6 0 0 3.6 0 8v16c0 4.4 3.6 8 8 8h24v172.7C11.8 214.8 0 226.9 0 240c0 67.2 34.6 126.2 86.8 160.5l-21.4 70.2C59.1 491.2 74.5 512 96 512h192c21.5 0 36.9-20.8 30.6-41.3l-21.4-70.2C349.4 366.2 384 307.2 384 240c0-13.1-11.8-25.2-32-35.3V32h24zM64 32h256v160.4c-34-10.2-78.8-16.4-128-16.4s-94 6.2-128 16.4V32zm128 176c83.9 0 152 14.3 152 32s-68.1 32-152 32-152-14.3-152-32 68.1-32 152-32zM96 480l19.5-63.9C139 426.3 164.8 432 192 432s53-5.7 76.5-15.9L288 480H96zm96-80c-75.2 0-138.1-52.3-155.1-122.4 34.9 16 91.3 26.4 155.1 26.4s120.2-10.4 155.1-26.4C330.1 347.7 267.2 400 192 400zM152 64h-48c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8z"
              className=""
            />
          </svg>
        ),
        id: 16,
        label: "Bathroom essentials",
      },
    ],
    selectedItems: new Set([]),
  };

  componentDidMount() {
    let already_visited = sessionStorage.getItem(
      "add-villa-selected-facilities-id"
    );
    if (already_visited && already_visited !== "empty") {
      let array = JSON.parse(
        sessionStorage.getItem("add-villa-selected-facilities-id")
      );
      this.setState({ selectedItems: new Set(array) });
    }
  }

  onSelect(id) {
    if (this.state.selectedItems.has(id)) {
      this.state.selectedItems.delete(id);
    } else this.state.selectedItems.add(id);
    this.forceUpdate();
  }

  save() {
    if (this.state.selectedItems.size === 0) {
      sessionStorage.setItem("add-villa-selected-facilities-id", "empty");
      toast.info("No facilities?! 😐");
    } else {
      let array = Array.from(this.state.selectedItems);
      sessionStorage.setItem(
        "add-villa-selected-facilities-id",
        JSON.stringify(array)
      );
    }
    let selected_facilities = [];
    for (let k = 0; k < this.state.facilities.length; k++) {
      if (this.state.selectedItems.has(this.state.facilities[k].id)) {
        selected_facilities = [
          ...selected_facilities,
          this.state.facilities[k].label,
        ];
        console.log(selected_facilities);
      }
    }
    sessionStorage.setItem(
      "add-villa-selected-facilities-label",
      JSON.stringify(selected_facilities)
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <h4>Specify accommodation facilities</h4>
        </Modal.Header>
        <Modal.Body>
          <div className={"row m-2"} id={"facilities"}>
            {this.state.facilities.map((facility) => (
              <div
                key={facility.id}
                className={
                  "col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-4 d-flex flex-column"
                }
                onClick={() => this.onSelect(facility.id)}
              >
                <div className={"fade-in-overlay h-100 d-flex flex-column"}>
                  <div className={"w-100 image mt-auto mb-auto"}>
                    <div className={"pl-4 pr-4 pt-4 pb-3 "}>{facility.src}</div>
                  </div>
                  <div
                    data-testid={"facility-select-test-".concat(facility.id)}
                    className={"overlay".concat(
                      this.state.selectedItems.has(facility.id)
                        ? " selected border-success"
                        : ""
                    )}
                  >
                    {this.state.selectedItems.has(facility.id) ? (
                      <React.Fragment>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="green"
                          className=" mt-2 ml-2 bi bi-check-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <label className={"mt-auto mb-2 text-center w-100"}>
                  {facility.label}
                </label>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className={"w-100"}>
          <Link
            to={"/hosting/addaccommodation/amentities/"}
            className={"mr-auto"}
          >
            <button className={"btn btn-outline-secondary"}>Back</button>
          </Link>
          <Link to={"/hosting/addaccommodation/address/"}>
            <button onClick={this.save} className={"btn btn-outline-primary"}>
              Next
            </button>
          </Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Facilities;
