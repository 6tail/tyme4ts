# Tyme

[![downloads](https://img.shields.io/npm/v/tyme4ts?color=4EB1BA&label=tyme4ts&style=flat-square)](https://npm.im/tyme4ts)
[![downloads](https://shields.io/npm/dm/tyme4ts?color=4EB1BA&label=downloads&style=flat-square)](https://npm.im/tyme4ts)
[![License](https://img.shields.io/badge/license-MIT-4EB1BA.svg?style=flat-square)](https://github.com/6tail/tyme4ts/blob/master/LICENSE)

Tyme 是一个非常强大的日历工具库，可以看作 [Lunar](https://6tail.cn/calendar/api.html "https://6tail.cn/calendar/api.html") 的升级版，拥有更优的设计和扩展性，支持公历和农历、星座、干支、生肖、节气、法定假日等。

## 安装

```bash
npm install tyme4ts
```

## 用法

```ts
import { SolarDay } from 'tyme4ts';

const solarDay = SolarDay.fromYmd(1986, 5, 29);
     
// 1986年5月29日
console.log(solarDay.toString());
    
// 农历丙寅年四月廿一
console.log(solarDay.getLunarDay().toString());
```


## 文档

请移步至 [https://6tail.cn/tyme.html](https://6tail.cn/tyme.html)

## License

MIT

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=6tail/tyme4ts&type=Date)](https://star-history.com/#6tail/tyme4ts&Date)
