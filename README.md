# Tyme [![License](https://img.shields.io/badge/license-MIT-4EB1BA.svg?style=flat-square)](https://github.com/6tail/tyme4ts/blob/master/LICENSE)

Tyme是一个非常强大的日历工具库，可以看作 [Lunar](https://6tail.cn/tyme.html "https://6tail.cn/calendar/api.html") 的升级版，拥有更优的设计和扩展性，支持公历和农历、星座、干支、生肖、节气、法定假日等。

## 示例

    // install
    npm init -y
    npm i typescript -D
    npm i ts-node -D
    npm i tyme4ts
     
    // test.ts
    import {SolarDay} from 'tyme4ts';
     
    const solar = SolarDay.fromYmd(1986, 5, 29);
     
    // 1986年5月29日
    console.log(solar.toString());
    
    // 农历丙寅年四月廿一
    console.log(solar.getLunarDay().toString());
     
    // run
    ts-node test.ts

## 文档

请移步至 [https://6tail.cn/tyme.html](https://6tail.cn/tyme.html "https://6tail.cn/calendar/api.html")

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=6tail/tyme4ts&type=Date)](https://star-history.com/#6tail/tyme4ts&Date)
