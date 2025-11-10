<template>
  <div class="rtMove">
    <img class="tuB" src="./images/tuB.png" />
    <img class="guangA" src="./images/guang.png" />
    <img class="guangB" src="./images/guang.png" />
    <img class="tuC" src="./images/tuC.png" />

    <img class="lingxA" src="./images/lingxA.png" />
    <img class="lingxB" src="./images/lingxB.png" />
    <img class="lingxC" src="./images/lingxC.png" />
    <img class="lingxD" src="./images/lingxD.png" />
    <img class="lingxE" src="./images/lingxE.png" />
    <img class="lingxF" src="./images/lingxF.png" />

    <img class="chaunB" src="./images/chaunB.png" />
    <img class="chaunC" src="./images/chaunB.png" />
    <img class="tuA" src="./images/tuA.png" />
    <img class="tuAa" src="./images/tuA.png" />

    <img class="ziA" src="./images/ziA.png" />
    <img class="ziB" src="./images/ziB.png" />
    <img class="ziC" src="./images/ziC.png" />

    <img class="ma tuAn" src="./images/tuAn.png" />
    <img class="ma tuMing" src="./images/tuMing.png" />

    <img class="ren" src="./images/ren.png" />
  </div>
</template>
<style scoped>
/* 动画的舞台 */
.rtMove {
  width: 444px;
  height: 430px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-image: url(./images/banner.png);
  background-position: center bottom;
  background-repeat: no-repeat;
}

/* 动画的子元素 */
.rtMove .tuC {
  position: absolute;
  top: 228px;
  left: 168px;
  opacity: 1;
  animation: tuC 1.6s linear infinite;
}

.rtMove .tuB {
  position: absolute;
  top: 123px;
  left: 111px;
  animation: tuB 2s linear infinite;
}

.rtMove .guangA {
  position: absolute;
  top: 309px;
  left: 279px;
  animation: guangA 1.3s linear infinite;
}

.rtMove .guangB {
  position: absolute;
  top: 263px;
  left: 239px;
  animation: guangB 1.1s linear infinite;
}

.rtMove .lingxA {
  position: absolute;
  top: 194px;
  left: 126px;
  opacity: 1;
  animation: lingxA 2s linear infinite;
}

.rtMove .lingxB {
  position: absolute;
  top: 163px;
  left: 79px;
  opacity: 1;
  animation: lingxB 2.2s linear infinite;
}

.rtMove .lingxC {
  position: absolute;
  top: 179px;
  left: 189px;
  opacity: 1;
  animation: lingxC 1.7s linear infinite;
}

.rtMove .lingxD {
  position: absolute;
  top: 103px;
  left: 160px;
  opacity: 1;
  animation: lingxC 2.7s linear infinite;
}

.rtMove .lingxE {
  position: absolute;
  top: 104px;
  left: 95px;
  opacity: 1;
  animation: lingxB 1.2s linear infinite;
}

.rtMove .lingxF {
  position: absolute;
  top: 84px;
  left: 144px;
  opacity: 1;
  animation: lingxA 1.4s linear infinite;
}

.rtMove .chaunB {
  position: absolute;
  top: 38px;
  left: 318px;
  animation: chaunB 1.2s linear infinite;
}

.rtMove .chaunC {
  position: absolute;
  top: 60px;
  left: 318px;
  animation: chaunC 0.7s linear infinite;
}

.rtMove .tuA {
  position: absolute;
  top: 140px;
  left: 316px;
  animation: tuA 1.3s linear infinite;
}

.rtMove .tuAa {
  position: absolute;
  top: 140px;
  left: 316px;
  animation: tuAa 1.3s linear infinite;
}

.rtMove .ziA {
  position: absolute;
  top: 114px;
  left: 320px;
  animation: ziA 2.6s linear infinite;
}

.rtMove .ziB {
  position: absolute;
  top: 144px;
  left: 339px;
  animation: ziB 2s linear infinite;
}

.rtMove .ziC {
  position: absolute;
  top: 91px;
  left: 349px;
  animation: ziC 1.7s linear infinite;
}

.rtMove .ma {
  position: absolute;
  top: 247px;
  left: 303px;
}

.rtMove .tuMing {
  opacity: 0;
  animation: tuMing 0.6s linear infinite;
}

.rtMove .ren {
  position: absolute;
  top: 283px;
  left: 330px;
}
@keyframes tuB {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes guangA {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-55px, -34px);
  }
}

@keyframes guangB {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(60px, 33px);
  }
}

@keyframes tuC {
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }

  40% {
    opacity: 1;
  }
  90%,
  100% {
    opacity: 1;
    transform: translate(40px, 20px);
  }
}

@keyframes lingxA {
  0% {
    opacity: 1;
    transform: translateY(-8px);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-60px);
  }
}

@keyframes lingxB {
  0% {
    opacity: 1;
    transform: translateY(-8px);
  }

  40% {
    opacity: 1;
  }

  90%,
  100% {
    opacity: 0;
    transform: translateY(-60px);
  }
}

@keyframes lingxC {
  0% {
    opacity: 1;
    transform: translateY(-8px);
  }

  50% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}

@keyframes chaunB {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(-70px);
  }
}

@keyframes chaunC {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(-40px);
  }
}

@keyframes tuA {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-120px);
  }
}

@keyframes tuAa {
  0%,
  30% {
    opacity: 1;
    transform: translateY(0px);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-60px);
  }
}

@keyframes ziA {
  0%,
  20%,
  40%,
  60%,
  80% {
    transform: translateY(0);
  }
  10%,
  50% {
    transform: translateY(-4px);
  }
  30%,
  70% {
    transform: translateY(4px);
  }
}

@keyframes ziB {
  0%,
  20%,
  40%,
  60%,
  80% {
    transform: translateY(0);
  }
  10%,
  50% {
    transform: translateY(3px);
  }
  30%,
  70% {
    transform: translateY(-3px);
  }
}

@keyframes ziC {
  0%,
  20%,
  40%,
  60%,
  80% {
    transform: translateY(0);
  }
  10%,
  50% {
    transform: translateY(-2px);
  }
  30%,
  70% {
    transform: translateY(3px);
  }
}

@keyframes tuMing {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
