export enum YinYang {
    YIN = 0,
    YANG = 1
}

export enum Side {
    IN = 0,
    OUT = 1
}

export enum Gender {
    WOMAN = 0,
    MAN = 1
}

export enum FestivalType {
    DAY = 0,
    TERM = 1,
    EVE = 2
}

export interface Culture {
    getName(): string;

    toString(): string;
}

export interface Tyme extends Culture {
    next(n: number): Tyme | null;
}

export abstract class AbstractCulture implements Culture {
    abstract getName(): string;

    toString(): string {
        return this.getName();
    }

    equals(o: Culture): boolean {
        return o && o.toString() === this.toString();
    }

    protected indexOf(index: number, size: number): number {
        let i: number = index % size;
        if (i < 0) {
            i += size;
        }
        return i;
    }
}

export abstract class AbstractTyme extends AbstractCulture implements Tyme {
    abstract next(n: number): Tyme | null;
}

export abstract class AbstractCultureDay extends AbstractCulture {
    protected culture: AbstractCulture;
    protected dayIndex: number;

    protected constructor(culture: AbstractCulture, dayIndex: number) {
        super();
        this.culture = culture;
        this.dayIndex = dayIndex;
    }

    getDayIndex(): number {
        return this.dayIndex;
    }

    protected getCulture(): Culture {
        return this.culture;
    }

    getName(): string {
        return this.culture.getName();
    }

    toString(): string {
        return `${this.culture.toString()}第${this.getDayIndex() + 1}天`;
    }
}

export abstract class LoopTyme extends AbstractTyme {
    protected names: string[];
    protected index: number;

    protected constructor(names: string[], indexOrName: number | string) {
        super();
        this.names = names;
        this.index = this.indexOfBy(indexOrName);
    }

    protected indexOfBy(indexOrName: number | string): number {
        if (typeof indexOrName === 'number') {
            return this.indexOf(indexOrName, this.getSize());
        } else {
            for (let i: number = 0, j: number = this.getSize(); i < j; i++) {
                if (this.names[i] === indexOrName) {
                    return i;
                }
            }
            throw new Error(`illegal name ${indexOrName}`);
        }
    }

    getName(): string {
        return this.names[this.index];
    }

    getIndex(): number {
        return this.index;
    }

    getSize(): number {
        return this.names.length;
    }

    protected nextIndex(n: number): number {
        return this.indexOfBy(this.index + n);
    }
}

export class Animal extends LoopTyme {

    static NAMES: string[] = ['蛟', '龙', '貉', '兔', '狐', '虎', '豹', '獬', '牛', '蝠', '鼠', '燕', '猪', '獝', '狼', '狗', '彘', '鸡', '乌', '猴', '猿', '犴', '羊', '獐', '马', '鹿', '蛇', '蚓'];

    protected constructor(indexOfName: number | string) {
        super(Animal.NAMES, indexOfName);
    }

    static fromIndex(index: number): Animal {
        return new Animal(index);
    }

    static fromName(name: string): Animal {
        return new Animal(name);
    }

    next(n: number): Animal {
        return Animal.fromIndex(this.nextIndex(n));
    }

    getTwentyEightStar(): TwentyEightStar {
        return TwentyEightStar.fromIndex(this.index);
    }
}

export class TwentyEightStar extends LoopTyme {
    static NAMES: string[] = ['角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虚', '危', '室', '壁', '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸'];

    protected constructor(indexOfName: number | string) {
        super(TwentyEightStar.NAMES, indexOfName);
    }

    static fromIndex(index: number): TwentyEightStar {
        return new TwentyEightStar(index);
    }

    static fromName(name: string): TwentyEightStar {
        return new TwentyEightStar(name);
    }

    next(n: number): TwentyEightStar {
        return TwentyEightStar.fromIndex(this.nextIndex(n));
    }

    getSevenStar(): SevenStar {
        return SevenStar.fromIndex(this.index % 7 + 4);
    }

    getLand(): Land {
        return Land.fromIndex([4, 4, 4, 2, 2, 2, 7, 7, 7, 0, 0, 0, 0, 5, 5, 5, 6, 6, 6, 1, 1, 1, 8, 8, 8, 3, 3, 3][this.index]);
    }

    getZone(): Zone {
        return Zone.fromIndex(~~(this.index / 7));
    }

    getAnimal(): Animal {
        return Animal.fromIndex(this.index);
    }

    getLuck(): Luck {
        return Luck.fromIndex([0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0][this.index]);
    }
}

export class SevenStar extends LoopTyme {
    static NAMES: string[] = ['日', '月', '火', '水', '木', '金', '土'];

    protected constructor(indexOfName: number | string) {
        super(SevenStar.NAMES, indexOfName);
    }

    static fromIndex(index: number): SevenStar {
        return new SevenStar(index);
    }

    static fromName(name: string): SevenStar {
        return new SevenStar(name);
    }

    next(n: number): SevenStar {
        return SevenStar.fromIndex(this.nextIndex(n));
    }

    getWeek(): Week {
        return Week.fromIndex(this.index);
    }
}

export class Week extends LoopTyme {
    static NAMES: string[] = ['日', '一', '二', '三', '四', '五', '六'];

    protected constructor(indexOfName: number | string) {
        super(Week.NAMES, indexOfName);
    }

    static fromIndex(index: number): Week {
        return new Week(index);
    }

    static fromName(name: string): Week {
        return new Week(name);
    }

    next(n: number): Week {
        return Week.fromIndex(this.nextIndex(n));
    }

    getSevenStar(): SevenStar {
        return SevenStar.fromIndex(this.index);
    }
}

export class Land extends LoopTyme {
    static NAMES: string[] = ['玄天', '朱天', '苍天', '阳天', '钧天', '幽天', '颢天', '变天', '炎天'];

    protected constructor(indexOfName: number | string) {
        super(Land.NAMES, indexOfName);
    }

    static fromIndex(index: number): Land {
        return new Land(index);
    }

    static fromName(name: string): Land {
        return new Land(name);
    }

    next(n: number): Land {
        return Land.fromIndex(this.nextIndex(n));
    }

    getDirection(): Direction {
        return Direction.fromIndex(this.index);
    }
}

export class Direction extends LoopTyme {
    static NAMES: string[] = ['北', '西南', '东', '东南', '中', '西北', '西', '东北', '南'];

    protected constructor(indexOfName: number | string) {
        super(Direction.NAMES, indexOfName);
    }

    static fromIndex(index: number): Direction {
        return new Direction(index);
    }

    static fromName(name: string): Direction {
        return new Direction(name);
    }

    next(n: number): Direction {
        return Direction.fromIndex(this.nextIndex(n));
    }

    getLand(): Land {
        return Land.fromIndex(this.index);
    }
}

export class Zone extends LoopTyme {
    static NAMES: string[] = ['东', '北', '西', '南'];

    protected constructor(indexOfName: number | string) {
        super(Zone.NAMES, indexOfName);
    }

    static fromIndex(index: number): Zone {
        return new Zone(index);
    }

    static fromName(name: string): Zone {
        return new Zone(name);
    }

    next(n: number): Zone {
        return Zone.fromIndex(this.nextIndex(n));
    }

    getDirection(): Direction {
        return Direction.fromName(this.getName());
    }

    getBeast(): Beast {
        return Beast.fromIndex(this.getIndex());
    }
}

export class Beast extends LoopTyme {
    static NAMES: string[] = ['青龙', '玄武', '白虎', '朱雀'];

    protected constructor(indexOfName: number | string) {
        super(Beast.NAMES, indexOfName);
    }

    static fromIndex(index: number): Beast {
        return new Beast(index);
    }

    static fromName(name: string): Beast {
        return new Beast(name);
    }

    next(n: number): Beast {
        return Beast.fromIndex(this.nextIndex(n));
    }

    getZone(): Zone {
        return Zone.fromIndex(this.index);
    }
}

export class Luck extends LoopTyme {
    static NAMES: string[] = ['吉', '凶'];

    protected constructor(indexOfName: number | string) {
        super(Luck.NAMES, indexOfName);
    }

    static fromIndex(index: number): Luck {
        return new Luck(index);
    }

    static fromName(name: string): Luck {
        return new Luck(name);
    }

    next(n: number): Luck {
        return Luck.fromIndex(this.nextIndex(n));
    }
}

export class Constellation extends LoopTyme {
    static NAMES: string[] = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];

    protected constructor(indexOfName: number | string) {
        super(Constellation.NAMES, indexOfName);
    }

    static fromIndex(index: number): Constellation {
        return new Constellation(index);
    }

    static fromName(name: string): Constellation {
        return new Constellation(name);
    }

    next(n: number): Constellation {
        return Constellation.fromIndex(this.nextIndex(n));
    }
}

export class Duty extends LoopTyme {
    static NAMES: string[] = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];

    protected constructor(indexOfName: number | string) {
        super(Duty.NAMES, indexOfName);
    }

    static fromIndex(index: number): Duty {
        return new Duty(index);
    }

    static fromName(name: string): Duty {
        return new Duty(name);
    }

    next(n: number): Duty {
        return Duty.fromIndex(this.nextIndex(n));
    }
}

export class Element extends LoopTyme {
    static NAMES: string[] = ['木', '火', '土', '金', '水'];

    protected constructor(indexOfName: number | string) {
        super(Element.NAMES, indexOfName);
    }

    static fromIndex(index: number): Element {
        return new Element(index);
    }

    static fromName(name: string): Element {
        return new Element(name);
    }

    next(n: number): Element {
        return Element.fromIndex(this.nextIndex(n));
    }

    getReinforce(): Element {
        return this.next(1);
    }

    getRestrain(): Element {
        return this.next(2);
    }

    getReinforced(): Element {
        return this.next(-1);
    }

    getRestrained(): Element {
        return this.next(-2);
    }
}

export class Phase extends LoopTyme {
    static NAMES: string[] = ['朔月', '既朔月', '蛾眉新月', '蛾眉新月', '蛾眉月', '夕月', '上弦月', '上弦月', '九夜月', '宵月', '宵月', '宵月', '渐盈凸月', '小望月', '望月', '既望月', '立待月', '居待月', '寝待月', '更待月', '渐亏凸月', '下弦月', '下弦月', '有明月', '有明月', '蛾眉残月', '蛾眉残月', '残月', '晓月', '晦月'];

    protected constructor(indexOfName: number | string) {
        super(Phase.NAMES, indexOfName);
    }

    static fromIndex(index: number): Phase {
        return new Phase(index);
    }

    static fromName(name: string): Phase {
        return new Phase(name);
    }

    next(n: number): Phase {
        return Phase.fromIndex(this.nextIndex(n));
    }
}

export class Sixty extends LoopTyme {
    static NAMES: string[] = ['上元', '中元', '下元'];

    protected constructor(indexOfName: number | string) {
        super(Sixty.NAMES, indexOfName);
    }

    static fromIndex(index: number): Sixty {
        return new Sixty(index);
    }

    static fromName(name: string): Sixty {
        return new Sixty(name);
    }

    next(n: number): Sixty {
        return Sixty.fromIndex(this.nextIndex(n));
    }
}

export class Sound extends LoopTyme {
    static NAMES: string[] = ['海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火', '涧下水', '城头土', '白蜡金', '杨柳木', '泉中水', '屋上土', '霹雳火', '松柏木', '长流水', '沙中金', '山下火', '平地木', '壁上土', '金箔金', '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水'];

    protected constructor(indexOfName: number | string) {
        super(Sound.NAMES, indexOfName);
    }

    static fromIndex(index: number): Sound {
        return new Sound(index);
    }

    static fromName(name: string): Sound {
        return new Sound(name);
    }

    next(n: number): Sound {
        return Sound.fromIndex(this.nextIndex(n));
    }
}

export class Ten extends LoopTyme {
    static NAMES: string[] = ['甲子', '甲戌', '甲申', '甲午', '甲辰', '甲寅'];

    protected constructor(indexOfName: number | string) {
        super(Ten.NAMES, indexOfName);
    }

    static fromIndex(index: number): Ten {
        return new Ten(index);
    }

    static fromName(name: string): Ten {
        return new Ten(name);
    }

    next(n: number): Ten {
        return Ten.fromIndex(this.nextIndex(n));
    }
}

export class Terrain extends LoopTyme {
    static NAMES: string[] = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];

    protected constructor(indexOfName: number | string) {
        super(Terrain.NAMES, indexOfName);
    }

    static fromIndex(index: number): Terrain {
        return new Terrain(index);
    }

    static fromName(name: string): Terrain {
        return new Terrain(name);
    }

    next(n: number): Terrain {
        return Terrain.fromIndex(this.nextIndex(n));
    }
}

export class Twenty extends LoopTyme {
    static NAMES: string[] = ['一运', '二运', '三运', '四运', '五运', '六运', '七运', '八运', '九运'];

    protected constructor(indexOfName: number | string) {
        super(Twenty.NAMES, indexOfName);
    }

    static fromIndex(index: number): Twenty {
        return new Twenty(index);
    }

    static fromName(name: string): Twenty {
        return new Twenty(name);
    }

    next(n: number): Twenty {
        return Twenty.fromIndex(this.nextIndex(n));
    }

    getSixty(): Sixty {
        return Sixty.fromIndex(~~(this.index / 3));
    }
}

export class Zodiac extends LoopTyme {
    static NAMES: string[] = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

    protected constructor(indexOfName: number | string) {
        super(Zodiac.NAMES, indexOfName);
    }

    static fromIndex(index: number): Zodiac {
        return new Zodiac(index);
    }

    static fromName(name: string): Zodiac {
        return new Zodiac(name);
    }

    next(n: number): Zodiac {
        return Zodiac.fromIndex(this.nextIndex(n));
    }

    getEarthBranch(): EarthBranch {
        return EarthBranch.fromIndex(this.index);
    }
}

export class EarthBranch extends LoopTyme {
    static NAMES: string[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    protected constructor(indexOfName: number | string) {
        super(EarthBranch.NAMES, indexOfName);
    }

    static fromIndex(index: number): EarthBranch {
        return new EarthBranch(index);
    }

    static fromName(name: string): EarthBranch {
        return new EarthBranch(name);
    }

    next(n: number): EarthBranch {
        return EarthBranch.fromIndex(this.nextIndex(n));
    }

    getElement(): Element {
        return Element.fromIndex([4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4][this.index]);
    }

    getYinYang(): YinYang {
        return this.index % 2 === 0 ? YinYang.YANG : YinYang.YIN;
    }

    getHideHeavenStemMain(): HeavenStem {
        return HeavenStem.fromIndex([9, 5, 0, 1, 4, 2, 3, 5, 6, 7, 4, 8][this.index]);
    }

    getHideHeavenStemMiddle(): HeavenStem | null {
        const n: number = [-1, 9, 2, -1, 1, 6, 5, 3, 8, -1, 7, 0][this.index];
        return n === -1 ? null : HeavenStem.fromIndex(n);
    }

    getHideHeavenStemResidual(): HeavenStem | null {
        const n: number = [-1, 7, 4, -1, 9, 4, -1, 1, 4, -1, 3, -1][this.index];
        return n === -1 ? null : HeavenStem.fromIndex(n);
    }

    getZodiac(): Zodiac {
        return Zodiac.fromIndex(this.index);
    }

    getDirection(): Direction {
        return Direction.fromIndex([0, 4, 2, 2, 4, 8, 8, 4, 6, 6, 4, 0][this.index]);
    }

    getOpposite(): EarthBranch {
        return this.next(6);
    }

    getOminous(): Direction {
        return Direction.fromIndex([8, 2, 0, 6][this.index % 4]);
    }

    getPengZuEarthBranch(): PengZuEarthBranch {
        return PengZuEarthBranch.fromIndex(this.index);
    }
}

export class HeavenStem extends LoopTyme {
    static NAMES: string[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

    protected constructor(indexOfName: number | string) {
        super(HeavenStem.NAMES, indexOfName);
    }

    static fromIndex(index: number): HeavenStem {
        return new HeavenStem(index);
    }

    static fromName(name: string): HeavenStem {
        return new HeavenStem(name);
    }

    next(n: number): HeavenStem {
        return HeavenStem.fromIndex(this.nextIndex(n));
    }

    getElement(): Element {
        return Element.fromIndex(~~(this.index / 2));
    }

    getYinYang(): YinYang {
        return this.index % 2 === 0 ? YinYang.YANG : YinYang.YIN;
    }

    getTenStar(target: HeavenStem): TenStar {
        const hostElement: Element = this.getElement();
        const guestElement: Element = target.getElement();
        let index: number = 0;
        const sameYinYang: boolean = this.getYinYang() == target.getYinYang();
        if (hostElement.getReinforce().equals(guestElement)) {
            index = 1;
        } else if (hostElement.getRestrain().equals(guestElement)) {
            index = 2;
        } else if (guestElement.getRestrain().equals(hostElement)) {
            index = 3;
        } else if (guestElement.getReinforce().equals(hostElement)) {
            index = 4;
        }
        return TenStar.fromIndex(index * 2 + (sameYinYang ? 0 : 1));
    }

    getDirection(): Direction {
        return Direction.fromIndex([2, 8, 4, 6, 0][~~(this.index / 2)]);
    }

    getJoyDirection(): Direction {
        return Direction.fromIndex([7, 5, 1, 8, 3][this.index % 5]);
    }

    getYangDirection(): Direction {
        return Direction.fromIndex([1, 1, 6, 5, 7, 0, 8, 7, 2, 3][this.index]);
    }

    getYinDirection(): Direction {
        return Direction.fromIndex([7, 0, 5, 6, 1, 1, 7, 8, 3, 2][this.index]);
    }

    getWealthDirection(): Direction {
        return Direction.fromIndex([7, 1, 0, 2, 8][~~(this.index / 2)]);
    }

    getMascotDirection(): Direction {
        return Direction.fromIndex([3, 3, 2, 2, 0, 8, 1, 1, 5, 6][this.index]);
    }

    getPengZuHeavenStem(): PengZuHeavenStem {
        return PengZuHeavenStem.fromIndex(this.index);
    }

    getTerrain(earthBranch: EarthBranch): Terrain {
        const earthBranchIndex: number = earthBranch.getIndex();
        return Terrain.fromIndex([1, 6, 10, 9, 10, 9, 7, 0, 4, 3][this.index] + (YinYang.YANG == this.getYinYang() ? earthBranchIndex : -earthBranchIndex));
    }
}

export class PengZuHeavenStem extends LoopTyme {
    static NAMES: string[] = ['甲不开仓财物耗散', '乙不栽植千株不长', '丙不修灶必见灾殃', '丁不剃头头必生疮', '戊不受田田主不祥', '己不破券二比并亡', '庚不经络织机虚张', '辛不合酱主人不尝', '壬不泱水更难提防', '癸不词讼理弱敌强'];

    protected constructor(indexOfName: number | string) {
        super(PengZuHeavenStem.NAMES, indexOfName);
    }

    static fromIndex(index: number): PengZuHeavenStem {
        return new PengZuHeavenStem(index);
    }

    static fromName(name: string): PengZuHeavenStem {
        return new PengZuHeavenStem(name);
    }

    next(n: number): PengZuHeavenStem {
        return PengZuHeavenStem.fromIndex(this.nextIndex(n));
    }
}

export class PengZuEarthBranch extends LoopTyme {
    static NAMES: string[] = ['子不问卜自惹祸殃', '丑不冠带主不还乡', '寅不祭祀神鬼不尝', '卯不穿井水泉不香', '辰不哭泣必主重丧', '巳不远行财物伏藏', '午不苫盖屋主更张', '未不服药毒气入肠', '申不安床鬼祟入房', '酉不会客醉坐颠狂', '戌不吃犬作怪上床', '亥不嫁娶不利新郎'];

    protected constructor(indexOfName: number | string) {
        super(PengZuEarthBranch.NAMES, indexOfName);
    }

    static fromIndex(index: number): PengZuEarthBranch {
        return new PengZuEarthBranch(index);
    }

    static fromName(name: string): PengZuEarthBranch {
        return new PengZuEarthBranch(name);
    }

    next(n: number): PengZuEarthBranch {
        return PengZuEarthBranch.fromIndex(this.nextIndex(n));
    }
}

export class PengZu extends AbstractCulture {
    protected pengZuHeavenStem: PengZuHeavenStem;
    protected pengZuEarthBranch: PengZuEarthBranch;

    protected constructor(sixtyCycle: SixtyCycle) {
        super();
        this.pengZuHeavenStem = PengZuHeavenStem.fromIndex(sixtyCycle.getHeavenStem().getIndex());
        this.pengZuEarthBranch = PengZuEarthBranch.fromIndex(sixtyCycle.getEarthBranch().getIndex());
    }

    static fromSixtyCycle(sixtyCycle: SixtyCycle): PengZu {
        return new PengZu(sixtyCycle);
    }

    getName(): string {
        return `${this.pengZuHeavenStem.getName()} ${this.pengZuEarthBranch.getName()}`;
    }

    getPengZuHeavenStem(): PengZuHeavenStem {
        return this.pengZuHeavenStem;
    }

    getPengZuEarthBranch(): PengZuEarthBranch {
        return this.pengZuEarthBranch;
    }
}

export class TenStar extends LoopTyme {
    static NAMES: string[] = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'];

    protected constructor(indexOfName: number | string) {
        super(TenStar.NAMES, indexOfName);
    }

    static fromIndex(index: number): TenStar {
        return new TenStar(index);
    }

    static fromName(name: string): TenStar {
        return new TenStar(name);
    }

    next(n: number): TenStar {
        return TenStar.fromIndex(this.nextIndex(n));
    }
}

export class SixtyCycle extends LoopTyme {
    static NAMES: string[] = ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'];

    protected constructor(indexOfName: number | string) {
        super(SixtyCycle.NAMES, indexOfName);
    }

    static fromIndex(index: number): SixtyCycle {
        return new SixtyCycle(index);
    }

    static fromName(name: string): SixtyCycle {
        return new SixtyCycle(name);
    }

    next(n: number): SixtyCycle {
        return SixtyCycle.fromIndex(this.nextIndex(n));
    }

    getHeavenStem(): HeavenStem {
        return HeavenStem.fromIndex(this.index % HeavenStem.NAMES.length);
    }

    getEarthBranch(): EarthBranch {
        return EarthBranch.fromIndex(this.index % EarthBranch.NAMES.length);
    }

    getSound(): Sound {
        return Sound.fromIndex(~~(this.index / 2));
    }

    getPengZu(): PengZu {
        return PengZu.fromSixtyCycle(this);
    }

    getTen(): Ten {
        return Ten.fromIndex(~~((this.getHeavenStem().getIndex() - this.getEarthBranch().getIndex()) / 2));
    }

    getExtraEarthBranches(): EarthBranch[] {
        const l: EarthBranch[] = [];
        l[0] = EarthBranch.fromIndex(10 + this.getEarthBranch().getIndex() - this.getHeavenStem().getIndex());
        l[1] = l[0].next(1);
        return l;
    }
}

export class Dog extends LoopTyme {
    static NAMES: string[] = ['初伏', '中伏', '末伏'];

    protected constructor(indexOfName: number | string) {
        super(Dog.NAMES, indexOfName);
    }

    static fromIndex(index: number): Dog {
        return new Dog(index);
    }

    static fromName(name: string): Dog {
        return new Dog(name);
    }

    next(n: number): Dog {
        return Dog.fromIndex(this.nextIndex(n));
    }
}

export class DogDay extends AbstractCultureDay {
    constructor(dog: Dog, dayIndex: number) {
        super(dog, dayIndex);
    }

    getDog(): Dog {
        return <Dog>this.culture;
    }
}

export class FetusHeavenStem extends LoopTyme {
    static NAMES: string[] = ['门', '碓磨', '厨灶', '仓库', '房床'];

    constructor(index: number) {
        super(FetusHeavenStem.NAMES, index);
    }

    next(n: number): FetusHeavenStem {
        return new FetusHeavenStem(this.nextIndex(n));
    }
}

export class FetusEarthBranch extends LoopTyme {
    static NAMES: string[] = ['碓', '厕', '炉', '门', '栖', '床'];

    constructor(index: number) {
        super(FetusEarthBranch.NAMES, index);
    }

    next(n: number): FetusEarthBranch {
        return new FetusEarthBranch(this.nextIndex(n));
    }
}

export class FetusDay extends AbstractCulture {
    protected fetusHeavenStem: FetusHeavenStem;
    protected fetusEarthBranch: FetusEarthBranch;
    protected side: Side;
    protected direction: Direction;

    protected constructor(lunarDay: LunarDay) {
        super();
        const sixtyCycle: SixtyCycle = lunarDay.getSixtyCycle();
        this.fetusHeavenStem = new FetusHeavenStem(sixtyCycle.getHeavenStem().getIndex() % 5);
        this.fetusEarthBranch = new FetusEarthBranch(sixtyCycle.getEarthBranch().getIndex() % 6);
        const index: number = [3, 3, 8, 8, 8, 8, 8, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, -9, -9, -9, -9, -9, -5, -5, -1, -1, -1, -3, -7, -7, -7, -7, -5, 7, 7, 7, 7, 7, 7, 2, 2, 2, 2, 2, 3, 3, 3, 3][sixtyCycle.getIndex()];
        this.side = index < 0 ? Side.IN : Side.OUT;
        this.direction = Direction.fromIndex(index);
    }

    static fromLunarDay(lunarDay: LunarDay): FetusDay {
        return new FetusDay(lunarDay);
    }

    getName(): string {
        let s: string = this.fetusHeavenStem.getName() + this.fetusEarthBranch.getName();
        if ('门门' === s) {
            s = '占大门';
        } else if ('碓磨碓' === s) {
            s = '占碓磨';
        } else if ('房床床' === s) {
            s = '占房床';
        } else if (s.indexOf('门') === 0) {
            s = '占' + s;
        }

        s += ' ';

        const directionName: string = this.direction.getName();
        if (Side.IN == this.side) {
            s += '房内';
        } else {
            s += '外';
        }

        if (Side.OUT == this.side && '北南西东'.indexOf(directionName) > -1) {
            s += '正';
        }
        s += directionName;
        return s;
    }

    getSide(): Side {
        return this.side;
    }

    getDirection(): Direction {
        return this.direction;
    }

    getFetusHeavenStem(): FetusHeavenStem {
        return this.fetusHeavenStem;
    }

    getFetusEarthBranch(): FetusEarthBranch {
        return this.fetusEarthBranch;
    }
}

export class Nine extends LoopTyme {
    static NAMES: string[] = ['一九', '二九', '三九', '四九', '五九', '六九', '七九', '八九', '九九'];

    protected constructor(indexOfName: number | string) {
        super(Nine.NAMES, indexOfName);
    }

    static fromIndex(index: number): Nine {
        return new Nine(index);
    }

    static fromName(name: string): Nine {
        return new Nine(name);
    }

    next(n: number): Nine {
        return Nine.fromIndex(this.nextIndex(n));
    }
}

export class NineDay extends AbstractCultureDay {
    constructor(nine: Nine, dayIndex: number) {
        super(nine, dayIndex);
    }

    getNine(): Nine {
        return <Nine>this.culture;
    }
}

export class Phenology extends LoopTyme {
    static NAMES: string[] = ['蚯蚓结', '麋角解', '水泉动', '雁北乡', '鹊始巢', '雉始雊', '鸡始乳', '征鸟厉疾', '水泽腹坚', '东风解冻', '蛰虫始振', '鱼陟负冰', '獭祭鱼', '候雁北', '草木萌动', '桃始华', '仓庚鸣', '鹰化为鸠', '玄鸟至', '雷乃发声', '始电', '桐始华', '田鼠化为鴽', '虹始见', '萍始生', '鸣鸠拂奇羽', '戴胜降于桑', '蝼蝈鸣', '蚯蚓出', '王瓜生', '苦菜秀', '靡草死', '麦秋至', '螳螂生', '鵙始鸣', '反舌无声', '鹿角解', '蜩始鸣', '半夏生', '温风至', '蟋蟀居壁', '鹰始挚', '腐草为萤', '土润溽暑', '大雨行时', '凉风至', '白露降', '寒蝉鸣', '鹰乃祭鸟', '天地始肃', '禾乃登', '鸿雁来', '玄鸟归', '群鸟养羞', '雷始收声', '蛰虫坯户', '水始涸', '鸿雁来宾', '雀入大水为蛤', '菊有黄花', '豺乃祭兽', '草木黄落', '蛰虫咸俯', '水始冰', '地始冻', '雉入大水为蜃', '虹藏不见', '天气上升地气下降', '闭塞而成冬', '鹖鴠不鸣', '虎始交', '荔挺出'];

    protected constructor(indexOfName: number | string) {
        super(Phenology.NAMES, indexOfName);
    }

    static fromIndex(index: number): Phenology {
        return new Phenology(index);
    }

    static fromName(name: string): Phenology {
        return new Phenology(name);
    }

    next(n: number): Phenology {
        return Phenology.fromIndex(this.nextIndex(n));
    }

    getThreePhenology(): ThreePhenology {
        return ThreePhenology.fromIndex(this.index % 3);
    }
}

export class ThreePhenology extends LoopTyme {
    static NAMES: string[] = ['初候', '二候', '三候'];

    protected constructor(indexOfName: number | string) {
        super(ThreePhenology.NAMES, indexOfName);
    }

    static fromIndex(index: number): ThreePhenology {
        return new ThreePhenology(index);
    }

    static fromName(name: string): ThreePhenology {
        return new ThreePhenology(name);
    }

    next(n: number): ThreePhenology {
        return ThreePhenology.fromIndex(this.nextIndex(n));
    }

    getThreePhenology(): ThreePhenology {
        return ThreePhenology.fromIndex(this.index % 3);
    }
}

export class Dipper extends LoopTyme {
    static NAMES: string[] = ['天枢', '天璇', '天玑', '天权', '玉衡', '开阳', '摇光', '洞明', '隐元'];

    protected constructor(indexOfName: number | string) {
        super(Dipper.NAMES, indexOfName);
    }

    static fromIndex(index: number): Dipper {
        return new Dipper(index);
    }

    static fromName(name: string): Dipper {
        return new Dipper(name);
    }

    next(n: number): Dipper {
        return Dipper.fromIndex(this.nextIndex(n));
    }
}

export class PhenologyDay extends AbstractCultureDay {
    constructor(phenology: Phenology, dayIndex: number) {
        super(phenology, dayIndex);
    }

    getPhenology(): Phenology {
        return <Phenology>this.culture;
    }
}

export class NineStar extends LoopTyme {
    static NAMES: string[] = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

    protected constructor(indexOfName: number | string) {
        super(NineStar.NAMES, indexOfName);
    }

    static fromIndex(index: number): NineStar {
        return new NineStar(index);
    }

    static fromName(name: string): NineStar {
        return new NineStar(name);
    }

    next(n: number): NineStar {
        return NineStar.fromIndex(this.nextIndex(n));
    }

    getColor(): string {
        return ['白', '黒', '碧', '绿', '黄', '白', '赤', '白', '紫'][this.index];
    }

    getElement(): Element {
        return Element.fromIndex([4, 2, 0, 0, 2, 3, 3, 2, 1][this.index]);
    }

    getDipper(): Dipper {
        return Dipper.fromIndex(this.index);
    }

    getDirection(): Direction {
        return Direction.fromIndex(this.index);
    }

    toString(): string {
        return this.getName() + this.getColor() + this.getElement();
    }
}

export class TwelveStar extends LoopTyme {
    static NAMES: string[] = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];

    protected constructor(indexOfName: number | string) {
        super(TwelveStar.NAMES, indexOfName);
    }

    static fromIndex(index: number): TwelveStar {
        return new TwelveStar(index);
    }

    static fromName(name: string): TwelveStar {
        return new TwelveStar(name);
    }

    next(n: number): TwelveStar {
        return TwelveStar.fromIndex(this.nextIndex(n));
    }

    getEcliptic(): Ecliptic {
        return Ecliptic.fromIndex([0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1][this.index]);
    }
}

export class Ecliptic extends LoopTyme {
    static NAMES: string[] = ['黄道', '黑道'];

    protected constructor(indexOfName: number | string) {
        super(Ecliptic.NAMES, indexOfName);
    }

    static fromIndex(index: number): Ecliptic {
        return new Ecliptic(index);
    }

    static fromName(name: string): Ecliptic {
        return new Ecliptic(name);
    }

    next(n: number): Ecliptic {
        return Ecliptic.fromIndex(this.nextIndex(n));
    }

    getLuck(): Luck {
        return Luck.fromIndex(this.index);
    }
}

export class LunarYear extends AbstractTyme {
    protected static LEAP: { [key: string]: number[] } = {};
    protected year: number;

    static {
        const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@';
        const months: string[] = '080b0r0j0j0j0C0j0j0C0j0j0j0C0j0C0j0C0F0j0V0V0V0u0j0j0C0j0j0j0j0V0C0j1v0u0C0V1v0C0b080u110u0C0j0C1v9K1v2z0j1vmZbl1veN3s1v0V0C2S1v0V0C2S2o0C0j1Z1c2S1v0j1c0j2z1v0j1c0j392H0b2_2S0C0V0j1c0j2z0C0C0j0j1c0j0N250j0C0j0b081n080b0C0C0C1c0j0N,0r1v1c1v0V0V0F0V0j0C0j0C0j0V0j0u1O0j0C0V0j0j0j0V0b080u0r0u080b0j0j0C0V0C0V0j0b080V0u080b0j0j0u0j1v0u080b1c0j080b0j0V0j0j0V0C0N1v0j1c0j0j1v2g1v420j1c0j2z1v0j1v5Q9z1v4l0j1vfn1v420j9z4l1v1v2S1c0j1v2S3s1v0V0C2S1v1v2S1c0j1v2S2_0b0j2_2z0j1c0j,0z0j0j0j0C0j0j0C0j0j0j0C0j0C0j0j0j0j0m0j0C0j0j0C0j0j0j0j0b0V0j0j0C0j0j0j0j0V0j0j0j0V0b0V0V0C0V0C0j0j0b080u110u0V0C0j0N0j0b080b080b0j0r0b0r0b0j0j0j0j0C0j0b0r0C0j0b0j0C0C0j0j0j0j0j0j0j0j0j0b110j0b0j0j0j0C0j0C0j0j0j0j0b080b080b0V080b080b0j0j0j0j0j0j0V0j0j0u1v0j0j0j0C0j0j0j0V0C0N1c0j0C0C0j0j0j1n080b0j0V0C0j0C0C2g0j1c0j0j1v2g1v0j0j1v7N0j1c0j3L0j0j1v5Q1Z5Q1v4lfn1v420j1v5Q1Z5Q1v4l1v2z1v,0H140r0N0r140r0u0r0V171c11140C0j0u110j0u0j1v0j0C0j0j0j0b080V0u080b0C1v0j0j0j0C0j0b080V0j0j0b080b0j0j0j0j0b080b0C080j0b080b0j0j0j0j0j0j0b080j0b080C0b080b080b080b0j0j0j0j080b0j0C0j0j0j0b0j0j080C0b0j0j0j0j0j0j0b08080b0j0C0j0j0j0b0j0j0K0b0j0C0j0j0j0b080b080j0C0b0j080b080b0j0j0j0j080b0j0b0r0j0j0j0b0j0C0r0b0j0j0j0j0j0j0j0b080j0b0r0C0j0b0j0j0j0r0b0j0C0j0j0j0u0r0b0C0j080b0j0j0j0j0j0j0j1c0j0b0j0j0j0C0j0j0j0j0j0j0j0b080j1c0u0j0j0j0C0j1c0j0u0j1c0j0j0j0j0j0j0j0j1c0j0u1v0j0j0V0j0j2g0j0j0j0C1v0C1G0j0j0V0C1Z1O0j0V0j0j2g1v0j0j0V0C2g5x1v4l1v421O7N0V0C4l1v2S1c0j1v2S2_,050b080C0j0j0j0C0j0j0C0j0j0j0C0j0C0j0C030j0j0j0j0j0j0j0j0j0C0j0b080u0V080b0j0j0V0j0j0j0j0j0j0j0j0j0V0N0j0C0C0j0j0j0j0j0j0j0j1c0j0u0j1v0j0j0j0j0j0b080b080j0j0j0b080b080b080b080b0j0j0j080b0j0b080j0j0j0j0b080b0j0j0r0b080b0b080j0j0j0j0b080b080j0b080j0b080b080b080b080b0j0j0r0b0j0b080j0j0j0j0b080b0j0j0C080b0b080j0j0j0j0j0j0j0b080u080j0j0b0j0j0j0C0j0b080j0j0j0j0b080b080b080b0C080b080b080b0j0j0j0j0j0j0b0C080j0j0b0j0j0j0C0j0b080j0j0C0b080b080j0b0j0j0C080b0j0j0j0j0j0j0b0j0j080C0b0j080b0j0j0j0j0j0j0j0C0j0j0j0b0j0j0C080b0j0j0j0j0j0j0b080b080b0K0b080b080b0j0j0j0j0j0j0j0C0j0j0u0j0j0V0j080b0j0C0j0j0j0b0j0r0C0b0j0j0j0j0j0j0j0j0j0C0j0b080b080b0j0C0C0j0C0j0j0j0u110u0j0j0j0j0j0j0j0j0C0j0j0u0j1c0j0j0j0j0j0j0j0j0V0C0u0j0C0C0V0C1Z0j0j0j0C0j0j0j1v0u0j1c0j0j0j0C0j0j2g0j1c1v0C1Z0V0j4l0j0V0j0j2g0j1v0j1v2S1c7N1v,0w0j1c0j0V0j0j0V0V0V0j0m0V0j0C1c140j0j0j0C0V0C0j1v0j0N0j0C0j0j0j0V0j0j1v0N0j0j0V0j0j0j0j0j0j080b0j0j0j0j0j0j0j080b0j0C0j0j0j0b0j0j080u080b0j0j0j0j0j0j0b080b080b080C0b0j080b080b0j0j0j0j080b0j0C0j0j0j0b0j0j080u080b0j0j0j0j0j0j0b080b080b080b0r0b0j080b080b0j0j0j0j080b0j0b0r0j0j0b080b0j0j080b0j080b0j080b080b0j0j0j0j0j0b080b0r0C0b080b0j0j0j0j080b0b080b080j0j0j0b080b080b080b0j0j0j0j080b0j0b080j0j0j0j0b080b0j0j0r0b080b0j0j0j0j0j0b080b080j0b0r0b080j0b080b0j0j0j0j080b0j0b080j0j0j0j0b080b0j080b0r0b0j080b080b0j0j0j0j0j0b080b0r0C0b080b0j0j0j0j0j0j0b080j0j0j0b080b080b080b0j0j0j0r0b0j0b080j0j0j0j0b080b0r0b0r0b0j080b080b0j0j0j0j0j0j0b0r0j0j0j0b0j0j0j0j080b0j0b080j0j0j0j0b080b080b0j0r0b0j080b0j0j0j0j0j0j0j0b0r0C0b0j0j0j0j0j0j0j080b0j0C0j0j0j0b0j0C0r0b0j0j0j0j0j0j0b080b080u0r0b0j080b0j0j0j0j0j0j0j0b0r0C0u0j0j0j0C0j080b0j0C0j0j0j0u110b0j0j0j0j0j0j0j0j0j0C0j0b080b0j0j0C0C0j0C0j0j0j0b0j1c0j080b0j0j0j0j0j0j0V0j0j0u0j1c0j0j0j0C0j0j2g0j0j0j0C0j0j0V0j0b080b1c0C0V0j0j2g0j0j0V0j0j1c0j1Z0j0j0C0C0j1v,160j0j0V0j1c0j0C0j0C0j1f0j0V0C0j0j0C0j0j0j1G080b080u0V080b0j0j0V0j1v0j0u0j1c0j0j0j0C0j0j0j0C0C0j1D0b0j080b0j0j0j0j0C0j0b0r0C0j0b0j0C0C0j0j0j0j0j0j0j0j0j0b0r0b0r0j0b0j0j0j0C0j0b0r0j0j0j0b080b080j0b0C0j080b080b0j0j0j0j0j0j0b0C080j0j0b0j0j0j0C0j0b080j0j0j0j0b080b080j0b0C0r0j0b0j0j0j0j0j0j0b0C080j0j0b0j0j0j0C0j0j0j0j0C0j0j0b080b0j0j0C080b0j0j0j0j0j0j0b080b080b080C0b080b080b080b0j0j0j0j0j0b080C0j0j0b080b0j0j0C080b0j0j0j0j0j0j0b080j0b0C080j0j0b0j0j0j0j0j0j0b080j0b080C0b080b080b080b0j0j0j0j080b0j0C0j0j0b080b0j0j0C080b0j0j0j0j0j0j0b080j0b080u080j0j0b0j0j0j0j0j0j0b080C0j0j0b080b0j0j0C0j0j080b0j0j0j0j0j0b080b0C0r0b080b0j0j0j0j0j0j0b080j0b080u080b080b080b0j0j0j0C0j0b080j0j0j0j0b0j0j0j0C0j0j080b0j0j0j0j0j0b080b0C0r0b080b0j0j0j0j0j0j0b080j0b0r0b080b080b080b0j0j0j0r0b0j0b0r0j0j0j0b0j0j0j0r0b0j080b0j0j0j0j0j0j0j0b0r0C0b0j0j0j0j0j0j0j0b080j0C0u080b080b0j0j0j0r0b0j0C0C0j0b0j110b0j080b0j0j0j0j0j0j0u0r0C0b0j0j0j0j0j0j0j0j0j0C0j0j0j0b0j1c0j0C0j0j0j0b0j0814080b080b0j0j0j0j0j0j1c0j0u0j0j0V0j0j0j0j0j0j0j0u110u0j0j0j,020b0r0C0j0j0j0C0j0j0V0j0j0j0j0j0C0j1f0j0C0j0V1G0j0j0j0j0V0C0j0C1v0u0j0j0j0V0j0j0C0j0j0j1v0N0C0V0j0j0j0K0C250b0C0V0j0j0V0j0j2g0C0V0j0j0C0j0j0b081v0N0j0j0V0V0j0j0u0j1c0j080b0j0j0j0j0j0j0V0j0j0u0j0j0V0j0j0j0C0j0b080b080V0b0j080b0j0j0j0j0j0j0j0b0r0C0j0b0j0j0j0C0j080b0j0j0j0j0j0j0u0r0C0u0j0j0j0j0j0j0b080j0C0j0b080b080b0j0C0j080b0j0j0j0j0j0j0b080b110b0j0j0j0j0j0j0j0j0j0b0r0j0j0j0b0j0j0j0r0b0j0b080j0j0j0j0b080b080b080b0r0b0j080b080b0j0j0j0j0j0j0b0r0C0b080b0j0j0j0j080b0j0b080j0j0j0j0b080b080b0j0j0j0r0b0j0j0j0j0j0j0b080b0j080C0b0j080b080b0j0j0j0j080b0j0b0r0C0b080b0j0j0j0j080b0j0j0j0j0j0b080b080b080b0j0j080b0r0b0j0j0j0j0j0j0b0j0j080C0b0j080b080b0j0j0j0j0j0b080C0j0j0b080b0j0j0C0j0b080j0j0j0j0b080b080b080b0C0C080b0j0j0j0j0j0j0b0C0C080b080b080b0j0j0j0j0j0j0b0C080j0j0b0j0j0j0C0j0b080j0b080j0j0b080b080b080b0C0r0b0j0j0j0j0j0j0b080b0r0b0r0b0j080b080b0j0j0j0j0j0j0b0r0C0j0b0j0j0j0j0j0j0b080j0C0j0b080j0b0j0j0K0b0j0C0j0j0j0b080b0j0K0b0j080b0j0j0j0j0j0j0V0j0j0b0j0j0j0C0j0j0j0j,0l0C0K0N0r0N0j0r1G0V0m0j0V1c0C0j0j0j0j1O0N110u0j0j0j0C0j0j0V0C0j0u110u0j0j0j0C0j0j0j0C0C0j250j1c2S1v1v0j5x2g0j1c0j0j1c2z0j1c0j0j1c0j0N1v0V0C1v0C0b0C0V0j0j0C0j0C1v0u0j0C0C0j0j0j0C0j0j0j0u110u0j0j0j0C0j0C0C0C0b080b0j0C0j080b0j0C0j0j0j0u110u0j0j0j0C0j0j0j0C0j0j0j0u0C0r0u0j0j0j0j0j0j0b0r0b0V080b080b0j0C0j0j0j0V0j0j0b0j0j0j0C0j0j0j0j0j0j0j0b080j0b0C0r0j0b0j0j0j0C0j0b0r0b0r0j0b080b080b0j0C0j0j0j0j0j0j0j0j0b0j0C0r0b0j0j0j0j0j0j0b080b080j0b0r0b0r0j0b0j0j0j0j080b0j0b0r0j0j0j0b080b080b0j0j0j0j080b0j0j0j0j0j0j0b0j0j0j0r0b0j0j0j0j0j0j0b080b080b080b0r0C0b080b0j0j0j0j0j0b080b0r0C0b080b080b080b0j0j0j0j080b0j0C0j0j0j0b0j0j0C080b0j0j0j0j0j0j0b080j0b0C080j0j0b0j0j0j0j0j0j0b0r0b080j0j0b080b080b0j0j0j0j0j0j0b080j0j0j0j0b0j0j0j0r0b0j0b080j0j0j0j0j0b080b080b0C0r0b0j0j0j0j0j0j0b080b080j0C0b0j080b080b0j0j0j0j0j0j,0a0j0j0j0j0C0j0j0C0j0C0C0j0j0j0j0j0j0j0m0C0j0j0j0j0u080j0j0j1n0j0j0j0j0C0j0j0j0V0j0j0j1c0u0j0C0V0j0j0V0j0j1v0N0C0V2o1v1O2S2o141v0j1v4l0j1c0j1v2S2o0C0u1v0j0C0C2S1v0j1c0j0j1v0N251c0j1v0b1c1v1n1v0j0j0V0j0j1v0N1v0C0V0j0j1v0b0C0j0j0V1c0j0u0j1c0j0j0j0j0j0j0j0j1c0j0u0j0j0V0j0j0j0j0j0j0b080u110u0j0j0j0j0j0j1c0j0b0j080b0j0C0j0j0j0V0j0j0u0C0V0j0j0j0C0j0b080j1c0j0b0j0j0j0C0j0C0j0j0j0b080b080b0j0C0j080b0j0j0j0j0j0j0j0b0C0r0u0j0j0j0j0j0j0b080j0b0r0C0j0b0j0j0j0r0b0j0b0r0j0j0j0b080b080b0j0r0b0j080b0j0j0j0j0j0j0b0j0r0C0b0j0j0j0j0j0j0b080j0j0C0j0j0b080b0j0j0j0j0j0j0j0j0j0j0b080b080b080b0C0j0j080b0j0j0j0j0j0j0b0j0j0C080b0j0j0j0j0j0j0j0j0b0C080j0j0b0j0j0j0j0j,0n0Q0j1c14010q0V1c171k0u0r140V0j0j1c0C0N1O0j0V0j0j0j1c0j0u110u0C0j0C0V0C0j0j0b671v0j1v5Q1O2S2o2S1v4l1v0j1v2S2o0C1Z0j0C0C1O141v0j1c0j2z1O0j0V0j0j1v0b2H390j1c0j0V0C2z0j1c0j1v2g0C0V0j1O0b0j0j0V0C1c0j0u0j1c0j0j0j0j0j0j0j0j1c0N0j0j0V0j0j0C0j0j0b081v0u0j0j0j0C0j1c0N0j0j0C0j0j0j0C0j0j0j0u0C0r0u0j0j0j0C0j0b080j1c0j0b0j0C0C0j0C0C0j0b080b080u0C0j080b0j0C0j0j0j0u110u0j0j0j0j0j0j0j0j0C0C0j0b0j0j0j0C0j0C0C0j0b080b080b0j0C0j080b0j0C0j0j0j0b0j110b0j0j0j0j0j,0B0j0V0j0j0C0j0j0j0C0j0C0j0j0C0j0m0j0j0j0j0C0j0C0j0j0u0j1c0j0j0C0C0j0j0j0j0j0j0j0j0u110N0j0j0V0C0V0j0b081n080b0CrU1O5e2SbX2_1Z0V2o141v0j0C0C0j2z1v0j1c0j7N1O420j1c0j1v2S1c0j1v2S2_0b0j0V0j0j1v0N1v0j0j1c0j1v140j0V0j0j0C0C0b080u1v0C0V0u110u0j0j0j0C0j0j0j0C0C0N0C0V0j0j0C0j0j0b080u110u0C0j0C0u0r0C0u080b0j0j0C0j0j0j'.split(',', -1);
        for (let i: number = 0; i < 12; i++) {
            let n: number = 0;
            const m: string = months[i];
            const size: number = ~~(m.length / 2);
            const l: number[] = [];
            for (let y: number = 0; y < size; y++) {
                const z: number = y * 2;
                const s: string = m.substring(z, z + 2);
                let t: number = 0;
                let c: number = 1;
                for (let x: number = 1; x > -1; x--) {
                    t += c * chars.indexOf(s.charAt(x));
                    c *= 64;
                }
                n += t;
                l.push(n);
            }
            LunarYear.LEAP[`${i + 1}`] = l;
        }
    }

    protected constructor(year: number) {
        super();
        if (year < -1 || year > 9999) {
            throw new Error(`illegal lunar year: ${year}`);
        }
        this.year = year;
    }

    static fromYear(year: number): LunarYear {
        return new LunarYear(year);
    }

    getYear(): number {
        return this.year;
    }

    getDayCount(): number {
        let n: number = 0;
        this.getMonths().forEach((m: LunarMonth): void => {
            n += m.getDayCount();
        });
        return n;
    }

    getName(): string {
        return `农历${this.getSixtyCycle().getName()}年`;
    }

    next(n: number): LunarYear {
        return LunarYear.fromYear(this.year + n);
    }

    getLeapMonth(): number {
        if (this.year === -1) {
            return 11;
        }
        for (const m in LunarYear.LEAP) {
            if (LunarYear.LEAP[m].indexOf(this.year) > -1) {
                return parseInt(m, 10);
            }
        }
        return 0;
    }

    getSixtyCycle(): SixtyCycle {
        return SixtyCycle.fromIndex(this.year - 4);
    }

    getTwenty(): Twenty {
        return Twenty.fromIndex(Math.floor((this.year - 1864) / 20));
    }

    getNineStar(): NineStar {
        return NineStar.fromIndex(63 + this.getTwenty().getSixty().getIndex() * 3 - this.getSixtyCycle().getIndex());
    }

    getJupiterDirection(): Direction {
        return Direction.fromIndex([0, 7, 7, 2, 3, 3, 8, 1, 1, 6, 0, 0][this.getSixtyCycle().getEarthBranch().getIndex()]);
    }

    getMonths(): LunarMonth[] {
        const l: LunarMonth[] = [];
        let m: LunarMonth = LunarMonth.fromYm(this.year, 1);
        while (m.getYear().getYear() === this.year) {
            l.push(m);
            m = m.next(1);
        }
        return l;
    }

    equals(o: LunarYear): boolean {
        return this.year === o.getYear();
    }

}

export class LunarSeason extends LoopTyme {
    static NAMES: string[] = ['孟春', '仲春', '季春', '孟夏', '仲夏', '季夏', '孟秋', '仲秋', '季秋', '孟冬', '仲冬', '季冬'];

    protected constructor(indexOfName: number | string) {
        super(LunarSeason.NAMES, indexOfName);
    }

    static fromIndex(index: number): LunarSeason {
        return new LunarSeason(index);
    }

    static fromName(name: string): LunarSeason {
        return new LunarSeason(name);
    }

    next(n: number): LunarSeason {
        return LunarSeason.fromIndex(this.nextIndex(n));
    }
}

export class FetusMonth extends LoopTyme {
    static NAMES: string[] = ['占房床', '占户窗', '占门堂', '占厨灶', '占房床', '占床仓', '占碓磨', '占厕户', '占门房', '占房床', '占灶炉', '占房床'];

    protected constructor(indexOfName: number | string) {
        super(FetusMonth.NAMES, indexOfName);
    }

    static fromLunarMonth(lunarMonth: LunarMonth): FetusMonth | null {
        return lunarMonth.isLeap() ? null : new FetusMonth(lunarMonth.getMonth() - 1);
    }

    next(n: number): FetusMonth {
        return new FetusMonth(this.nextIndex(n));
    }
}

export class LunarMonth extends AbstractTyme {
    static NAMES: string[] = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

    protected year: LunarYear;
    protected month: number;
    protected leap: boolean;
    protected dayCount: number;
    protected indexInYear: number;
    protected firstJulianDay: JulianDay;

    protected constructor(year: number, month: number) {
        super();
        const currentYear: LunarYear = LunarYear.fromYear(year);
        const currentLeapMonth: number = currentYear.getLeapMonth();
        if (month === 0 || month > 12 || month < -12) {
            throw new Error(`illegal lunar month: ${month}`);
        }
        const leap: boolean = month < 0;
        const m: number = Math.abs(month);
        if (leap && m != currentLeapMonth) {
            throw new Error(`illegal leap month ${m} in lunar year ${year}`);
        }

        // 冬至
        const dongZhi: SolarTerm = SolarTerm.fromIndex(year, 0);
        const dongZhiJd: number = dongZhi.getCursoryJulianDay();

        // 冬至前的初一，今年首朔的日月黄经差
        let w: number = ShouXingUtil.calcShuo(dongZhiJd);
        if (w > dongZhiJd) {
            w -= 29.53;
        }

        // 计算正月初一的偏移
        const prevYear: LunarYear = LunarYear.fromYear(year - 1);
        const prevLeapMonth: number = prevYear.getLeapMonth();

        // 正常情况正月初一为第3个朔日，但有些特殊的
        let offset: number = 2;
        if (year > 8 && year < 24) {
            offset = 1;
        } else if (prevLeapMonth > 10 && year != 239 && year != 240) {
            offset = 3;
        }

        // 位于当年的索引
        let index: number = m - 1;
        if (leap || (currentLeapMonth > 0 && m > currentLeapMonth)) {
            index += 1;
        }
        this.indexInYear = index;

        // 本月初一
        w += 29.5306 * (offset + index);
        const firstDay: number = ShouXingUtil.calcShuo(w);
        this.firstJulianDay = JulianDay.fromJulianDay(JulianDay.J2000 + firstDay);
        // 本月天数 = 下月初一 - 本月初一
        this.dayCount = ~~(ShouXingUtil.calcShuo(w + 29.5306) - firstDay);
        this.year = currentYear;
        this.month = m;
        this.leap = leap;
    }

    static fromYm(year: number, month: number): LunarMonth {
        return new LunarMonth(year, month);
    }

    getYear(): LunarYear {
        return this.year;
    }

    getMonth(): number {
        return this.month;
    }

    getMonthWithLeap(): number {
        return this.leap ? -this.month : this.month;
    }

    getDayCount(): number {
        return this.dayCount;
    }

    getIndexInYear(): number {
        return this.indexInYear;
    }

    getSeason(): LunarSeason {
        return LunarSeason.fromIndex(this.month - 1);
    }

    getFirstJulianDay(): JulianDay {
        return this.firstJulianDay;
    }

    isLeap(): boolean {
        return this.leap;
    }

    getWeekCount(start: number): number {
        return Math.ceil((this.indexOf(this.firstJulianDay.getWeek().getIndex() - start, 7) + this.getDayCount()) / 7);
    }

    getName(): string {
        return (this.leap ? '闰' : '') + LunarMonth.NAMES[this.month - 1];
    }

    toString(): string {
        return this.year.toString() + this.getName();
    }

    next(n: number): LunarMonth {
        if (n === 0) {
            return LunarMonth.fromYm(this.year.getYear(), this.getMonthWithLeap());
        }
        let m: number = this.indexInYear + 1 + n;
        let y: LunarYear = this.year;
        let leapMonth: number = y.getLeapMonth();
        let monthSize: number = 12 + (leapMonth > 0 ? 1 : 0);
        const forward: boolean = n > 0;
        const add: number = forward ? 1 : -1;
        while (forward ? (m > monthSize) : (m <= 0)) {
            if (forward) {
                m -= monthSize;
            }
            y = y.next(add);
            leapMonth = y.getLeapMonth();
            monthSize = 12 + (leapMonth > 0 ? 1 : 0);
            if (!forward) {
                m += monthSize;
            }
        }
        let leap: boolean = false;
        if (leapMonth > 0) {
            if (m === leapMonth + 1) {
                leap = true;
            }
            if (m > leapMonth) {
                m--;
            }
        }
        return LunarMonth.fromYm(y.getYear(), leap ? -m : m);
    }

    getDays(): LunarDay[] {
        const y: number = this.year.getYear();
        const m: number = this.getMonthWithLeap();
        const l: LunarDay[] = [];
        for (let i: number = 0, j: number = this.getDayCount(); i < j; i++) {
            l.push(LunarDay.fromYmd(y, m, i + 1));
        }
        return l;
    }

    getWeeks(start: number): LunarWeek[] {
        const y: number = this.year.getYear();
        const m: number = this.getMonthWithLeap();
        const l: LunarWeek[] = [];
        for (let i: number = 0, j: number = this.getWeekCount(start); i < j; i++) {
            l.push(LunarWeek.fromYm(y, m, i, start));
        }
        return l;
    }

    getSixtyCycle(): SixtyCycle {
        return SixtyCycle.fromName(HeavenStem.fromIndex((this.year.getSixtyCycle().getHeavenStem().getIndex() + 1) * 2 + this.indexInYear).getName() + EarthBranch.fromIndex(this.indexInYear + 2).getName());
    }

    getNineStar(): NineStar {
        return NineStar.fromIndex(27 - this.year.getSixtyCycle().getEarthBranch().getIndex() % 3 * 3 - this.getSixtyCycle().getEarthBranch().getIndex());
    }

    getJupiterDirection(): Direction {
        const sixtyCycle: SixtyCycle = this.getSixtyCycle();
        const n: number = [7, -1, 1, 3][sixtyCycle.getEarthBranch().next(-2).getIndex() % 4];
        return n === -1 ? sixtyCycle.getHeavenStem().getDirection() : Direction.fromIndex(n);
    }

    getFetus(): FetusMonth | null {
        return FetusMonth.fromLunarMonth(this);
    }

    equals(o: LunarMonth): boolean {
        return this.year.equals(o.getYear()) && this.getMonthWithLeap() === o.getMonthWithLeap();
    }
}

export class LunarWeek extends AbstractTyme {
    static NAMES: string[] = ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周'];
    protected month: LunarMonth;
    protected index: number;
    protected start: Week;

    protected constructor(year: number, month: number, index: number, start: number) {
        super();
        if (index < 0 || index > 5) {
            throw new Error(`illegal lunar week index: ${index}`);
        }
        if (start < 0 || start > 6) {
            throw new Error(`illegal lunar week start: ${start}`);
        }
        const m: LunarMonth = LunarMonth.fromYm(year, month);
        if (index >= m.getWeekCount(start)) {
            throw new Error(`illegal lunar week index: ${index} in month: ${m.toString()}`);
        }
        this.month = m;
        this.index = index;
        this.start = Week.fromIndex(start);
    }

    static fromYm(year: number, month: number, index: number, start: number): LunarWeek {
        return new LunarWeek(year, month, index, start);
    }

    getMonth(): LunarMonth {
        return this.month;
    }

    getIndex(): number {
        return this.index;
    }

    getStart(): Week {
        return this.start;
    }

    getName(): string {
        return LunarWeek.NAMES[this.index];
    }

    toString(): string {
        return this.month.toString() + this.getName();
    }

    next(n: number): LunarWeek {
        const startIndex: number = this.start.getIndex();
        if (n === 0) {
            return LunarWeek.fromYm(this.month.getYear().getYear(), this.month.getMonthWithLeap(), this.index, startIndex);
        }
        let d: number = this.index + n;
        let m: LunarMonth = this.month;
        let weeksInMonth: number = m.getWeekCount(startIndex);
        const forward: boolean = n > 0;
        const add: number = forward ? 1 : -1;
        while (forward ? (d >= weeksInMonth) : (d < 0)) {
            if (forward) {
                d -= weeksInMonth;
            }
            if (!forward) {
                if (!LunarDay.fromYmd(m.getYear().getYear(), m.getMonthWithLeap(), 1).getWeek().equals(this.start)) {
                    d += add;
                }
            }
            m = m.next(add);
            if (forward) {
                if (!LunarDay.fromYmd(m.getYear().getYear(), m.getMonthWithLeap(), 1).getWeek().equals(this.start)) {
                    d += add;
                }
            }
            weeksInMonth = m.getWeekCount(startIndex);
            if (!forward) {
                d += weeksInMonth;
            }
        }
        return LunarWeek.fromYm(m.getYear().getYear(), m.getMonthWithLeap(), d, startIndex);
    }

    getFirstDay(): LunarDay {
        const m: LunarMonth = this.getMonth();
        const firstDay: LunarDay = LunarDay.fromYmd(m.getYear().getYear(), m.getMonthWithLeap(), 1);
        return firstDay.next(this.index * 7 - this.indexOf(firstDay.getWeek().getIndex() - this.start.getIndex(), 7));
    }

    getDays(): LunarDay[] {
        const l: LunarDay[] = [];
        const d: LunarDay = this.getFirstDay();
        l.push(d);
        for (let i: number = 1; i < 7; i++) {
            l.push(d.next(i));
        }
        return l;
    }
}

export class LunarDay extends AbstractTyme {
    static NAMES: string[] = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    protected month: LunarMonth;
    protected day: number;

    protected constructor(year: number, month: number, day: number) {
        super();
        const m: LunarMonth = LunarMonth.fromYm(year, month);
        if (day < 1 || day > m.getDayCount()) {
            throw new Error(`illegal day ${day} in ${m.toString()}`);
        }
        this.month = m;
        this.day = day;
    }

    static fromYmd(year: number, month: number, day: number): LunarDay {
        return new LunarDay(year, month, day);
    }

    getMonth(): LunarMonth {
        return this.month;
    }

    getDay(): number {
        return this.day;
    }

    getName(): string {
        return LunarDay.NAMES[this.day - 1];
    }

    toString(): string {
        return this.month.toString() + this.getName();
    }

    next(n: number): LunarDay {
        if (n === 0) {
            return LunarDay.fromYmd(this.month.getYear().getYear(), this.month.getMonthWithLeap(), this.day);
        }
        let d: number = this.day + n;
        let lm: LunarMonth = this.month;
        let daysInMonth: number = lm.getDayCount();
        const forward: boolean = n > 0;
        const add: number = forward ? 1 : -1;
        while (forward ? (d > daysInMonth) : (d <= 0)) {
            if (forward) {
                d -= daysInMonth;
            }
            lm = lm.next(add);
            daysInMonth = lm.getDayCount();
            if (!forward) {
                d += daysInMonth;
            }
        }
        return LunarDay.fromYmd(lm.getYear().getYear(), lm.getMonthWithLeap(), d);
    }

    isBefore(target: LunarDay): boolean {
        const aYear: number = this.month.getYear().getYear();
        const targetMonth: LunarMonth = target.getMonth();
        const bYear: number = targetMonth.getYear().getYear();
        if (aYear === bYear) {
            const aMonth: number = this.month.getMonth();
            const bMonth: number = targetMonth.getMonth();
            if (aMonth === bMonth) {
                if (this.month.isLeap() && !targetMonth.isLeap()) {
                    return false;
                }
                return this.day < target.getDay();
            }
            return aMonth < bMonth;
        }
        return aYear < bYear;
    }

    isAfter(target: LunarDay): boolean {
        const aYear: number = this.month.getYear().getYear();
        const targetMonth: LunarMonth = target.getMonth();
        const bYear: number = targetMonth.getYear().getYear();
        if (aYear === bYear) {
            const aMonth: number = this.month.getMonth();
            const bMonth: number = targetMonth.getMonth();
            if (aMonth === bMonth) {
                if (this.month.isLeap() && !targetMonth.isLeap()) {
                    return true;
                }
                return this.day > target.getDay();
            }
            return aMonth > bMonth;
        }
        return aYear > bYear;
    }

    getWeek(): Week {
        return this.getSolarDay().getJulianDay().getWeek();
    }

    getYearSixtyCycle(): SixtyCycle {
        const solarDay: SolarDay = this.getSolarDay();
        const solarYear: number = solarDay.getMonth().getYear().getYear();
        const springSolarDay: SolarDay = SolarTerm.fromIndex(solarYear, 3).getJulianDay().getSolarDay();
        const lunarYear: LunarYear = this.month.getYear();
        const year: number = lunarYear.getYear();
        let sixtyCycle: SixtyCycle = lunarYear.getSixtyCycle();
        if (year === solarYear) {
            if (solarDay.isBefore(springSolarDay)) {
                sixtyCycle = sixtyCycle.next(-1);
            }
        } else if (year < solarYear) {
            if (!solarDay.isBefore(springSolarDay)) {
                sixtyCycle = sixtyCycle.next(1);
            }
        }
        return sixtyCycle;
    }

    getMonthSixtyCycle(): SixtyCycle {
        const solarDay: SolarDay = this.getSolarDay();
        const year: number = solarDay.getMonth().getYear().getYear();
        const term: SolarTerm = solarDay.getTerm();
        let index: number = term.getIndex() - 3;
        if (index < 0 && term.getJulianDay().getSolarDay().isAfter(SolarTerm.fromIndex(year, 3).getJulianDay().getSolarDay())) {
            index += 24;
        }
        return LunarMonth.fromYm(year, 1).getSixtyCycle().next(Math.floor(index / 2));
    }

    getSixtyCycle(): SixtyCycle {
        const offset: number = ~~(this.month.getFirstJulianDay().next(this.day - 12).getDay());
        return SixtyCycle.fromName(HeavenStem.fromIndex(offset).getName() + EarthBranch.fromIndex(offset).getName());
    }

    getDuty(): Duty {
        return Duty.fromIndex(this.getSixtyCycle().getEarthBranch().getIndex() - this.getMonthSixtyCycle().getEarthBranch().getIndex());
    }

    getTwelveStar(): TwelveStar {
        return TwelveStar.fromIndex(this.getSixtyCycle().getEarthBranch().getIndex() + (8 - this.getMonthSixtyCycle().getEarthBranch().getIndex() % 6) * 2);
    }

    getNineStar(): NineStar {
        const solar: SolarDay = this.getSolarDay();
        const dongZhi: SolarTerm = SolarTerm.fromIndex(solar.getMonth().getYear().getYear(), 0);
        const xiaZhi: SolarTerm = dongZhi.next(12);
        const dongZhi2: SolarTerm = dongZhi.next(24);
        const dongZhiSolar: SolarDay = dongZhi.getJulianDay().getSolarDay();
        const xiaZhiSolar: SolarDay = xiaZhi.getJulianDay().getSolarDay();
        const dongZhiSolar2: SolarDay = dongZhi2.getJulianDay().getSolarDay();
        const dongZhiIndex: number = dongZhiSolar.getLunarDay().getSixtyCycle().getIndex();
        const xiaZhiIndex: number = xiaZhiSolar.getLunarDay().getSixtyCycle().getIndex();
        const dongZhiIndex2: number = dongZhiSolar2.getLunarDay().getSixtyCycle().getIndex();
        const solarShunBai: SolarDay = dongZhiSolar.next(dongZhiIndex > 29 ? 60 - dongZhiIndex : -dongZhiIndex);
        const solarShunBai2: SolarDay = dongZhiSolar2.next(dongZhiIndex2 > 29 ? 60 - dongZhiIndex2 : -dongZhiIndex2);
        const solarNiZi: SolarDay = xiaZhiSolar.next(xiaZhiIndex > 29 ? 60 - xiaZhiIndex : -xiaZhiIndex);
        let offset: number = 0;
        if (!solar.isBefore(solarShunBai) && solar.isBefore(solarNiZi)) {
            offset = solar.subtract(solarShunBai);
        } else if (!solar.isBefore(solarNiZi) && solar.isBefore(solarShunBai2)) {
            offset = 8 - solar.subtract(solarNiZi);
        } else if (!solar.isBefore(solarShunBai2)) {
            offset = solar.subtract(solarShunBai2);
        } else if (solar.isBefore(solarShunBai)) {
            offset = 8 + solarShunBai.subtract(solar);
        }
        return NineStar.fromIndex(offset);
    }

    getJupiterDirection(): Direction {
        const index: number = this.getSixtyCycle().getIndex();
        if (index % 12 < 6) {
            return Direction.fromIndex([2, 8, 4, 6, 0][~~(index / 12)]);
        }
        return this.month.getYear().getJupiterDirection();
    }

    getFetusDay(): FetusDay {
        return FetusDay.fromLunarDay(this);
    }

    getPhase(): Phase {
        return Phase.fromIndex(this.day - 1);
    }

    getSolarDay(): SolarDay {
        return this.month.getFirstJulianDay().next(this.day - 1).getSolarDay();
    }

    getTwentyEightStar(): TwentyEightStar {
        return TwentyEightStar.fromIndex([10, 18, 26, 6, 14, 22, 2][this.getSolarDay().getWeek().getIndex()]).next(-7 * this.getSixtyCycle().getEarthBranch().getIndex());
    }

    getFestival(): LunarFestival | null {
        const m: LunarMonth = this.getMonth();
        return LunarFestival.fromYmd(m.getYear().getYear(), m.getMonthWithLeap(), this.day);
    }

    equals(o: LunarDay): boolean {
        return this.month.equals(o.getMonth()) && this.day === o.getDay();
    }
}

export class LunarHour extends AbstractTyme {
    protected day: LunarDay;
    protected hour: number;
    protected minute: number;
    protected second: number;

    protected constructor(year: number, month: number, day: number, hour: number, minute: number, second: number) {
        super();
        if (hour < 0 || hour > 23) {
            throw new Error(`illegal hour: ${hour}`);
        }
        if (minute < 0 || minute > 59) {
            throw new Error(`illegal minute: ${minute}`);
        }
        if (second < 0 || second > 59) {
            throw new Error(`illegal second: ${second}`);
        }
        this.day = LunarDay.fromYmd(year, month, day);
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): LunarHour {
        return new LunarHour(year, month, day, hour, minute, second);
    }

    getDay(): LunarDay {
        return this.day;
    }

    getHour(): number {
        return this.hour;
    }

    getMinute(): number {
        return this.minute;
    }

    getSecond(): number {
        return this.second;
    }

    getName(): string {
        return EarthBranch.fromIndex(this.getIndexInDay()).getName() + '时';
    }

    toString(): string {
        return `${this.day.toString()}${this.getSixtyCycle().getName()}时`;
    }

    getIndexInDay(): number {
        return ~~((this.hour + 1) / 2);
    }

    next(n: number): LunarHour {
        const h: number = this.hour + n * 2;
        const diff: number = h < 0 ? -1 : 1;
        let hour: number = Math.abs(h);
        let days: number = ~~(hour / 24) * diff;
        hour = (hour % 24) * diff;
        if (hour < 0) {
            hour += 24;
            days--;
        }
        const d: LunarDay = this.day.next(days);
        const month: LunarMonth = d.getMonth();
        return LunarHour.fromYmdHms(month.getYear().getYear(), month.getMonthWithLeap(), d.getDay(), hour, this.minute, this.second);
    }

    isBefore(target: LunarHour): boolean {
        if (!this.day.equals(target.getDay())) {
            return this.day.isBefore(target.getDay());
        }
        const bHour: number = target.getHour();
        if (this.hour === bHour) {
            const bMinute: number = target.getMinute();
            return this.minute === bMinute ? this.second < target.getSecond() : this.minute < bMinute;
        }
        return this.hour < bHour;
    }

    isAfter(target: LunarHour): boolean {
        if (!this.day.equals(target.getDay())) {
            return this.day.isAfter(target.getDay());
        }
        const bHour: number = target.getHour();
        if (this.hour === bHour) {
            const bMinute: number = target.getMinute();
            return this.minute === bMinute ? this.second > target.getSecond() : this.minute > bMinute;
        }
        return this.hour > bHour;
    }

    getYearSixtyCycle(): SixtyCycle {
        const solarTime: SolarTime = this.getSolarTime();
        const solarYear: number = this.day.getSolarDay().getMonth().getYear().getYear();
        const springSolarTime: SolarTime = SolarTerm.fromIndex(solarYear, 3).getJulianDay().getSolarTime();
        const lunarYear: LunarYear = this.day.getMonth().getYear();
        const year: number = lunarYear.getYear();
        let sixtyCycle: SixtyCycle = lunarYear.getSixtyCycle();
        if (year === solarYear) {
            if (solarTime.isBefore(springSolarTime)) {
                sixtyCycle = sixtyCycle.next(-1);
            }
        } else if (year < solarYear) {
            if (!solarTime.isBefore(springSolarTime)) {
                sixtyCycle = sixtyCycle.next(1);
            }
        }
        return sixtyCycle;
    }

    getMonthSixtyCycle(): SixtyCycle {
        const solarTime: SolarTime = this.getSolarTime();
        const year: number = solarTime.getDay().getMonth().getYear().getYear();
        const term: SolarTerm = solarTime.getTerm();
        let index: number = term.getIndex() - 3;
        if (index < 0 && term.getJulianDay().getSolarTime().isAfter(SolarTerm.fromIndex(year, 3).getJulianDay().getSolarTime())) {
            index += 24;
        }
        return LunarMonth.fromYm(year, 1).getSixtyCycle().next(Math.floor(index / 2));
    }

    getDaySixtyCycle(): SixtyCycle {
        const day: SixtyCycle = this.day.getSixtyCycle();
        return this.hour > 22 ? day.next(1) : day;
    }

    getSixtyCycle(): SixtyCycle {
        const earthBranchIndex: number = this.getIndexInDay() % 12;
        const heavenStemIndex: number = this.getDaySixtyCycle().getHeavenStem().getIndex() % 5 * 2 + earthBranchIndex;
        return SixtyCycle.fromName(HeavenStem.fromIndex(heavenStemIndex).getName() + EarthBranch.fromIndex(earthBranchIndex).getName());
    }

    getNineStar(): NineStar {
        const solar: SolarDay = this.day.getSolarDay();
        const dongZhi: SolarTerm = SolarTerm.fromIndex(solar.getMonth().getYear().getYear(), 0);
        const xiaZhi: SolarTerm = dongZhi.next(12);
        const asc: boolean = !solar.isBefore(dongZhi.getJulianDay().getSolarDay()) && solar.isBefore(xiaZhi.getJulianDay().getSolarDay());
        let start: number = [8, 5, 2][this.day.getSixtyCycle().getEarthBranch().getIndex() % 3];
        if (asc) {
            start = 8 - start;
        }
        const earthBranchIndex: number = this.getIndexInDay() % 12;
        return NineStar.fromIndex(start + (asc ? earthBranchIndex : -earthBranchIndex));
    }

    getSolarTime(): SolarTime {
        const d: SolarDay = this.day.getSolarDay();
        const m: SolarMonth = d.getMonth();
        return SolarTime.fromYmdHms(m.getYear().getYear(), m.getMonth(), d.getDay(), this.hour, this.minute, this.second);
    }

    getEightChar(): EightChar {
        return new EightChar(this.getYearSixtyCycle(), this.getMonthSixtyCycle(), this.getDaySixtyCycle(), this.getSixtyCycle());
    }

    equals(o: LunarHour): boolean {
        return this.day.equals(o.getDay()) && this.hour === o.getHour() && this.minute === o.getMinute() && this.second === o.getSecond();
    }

}

export class JulianDay extends AbstractTyme {
    static J2000 = 2451545;
    protected day: number;

    protected constructor(day: number) {
        super();
        this.day = day;
    }

    static fromJulianDay(day: number): JulianDay {
        return new JulianDay(day);
    }

    static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): JulianDay {
        const d: number = day + ((second / 60 + minute) / 60 + hour) / 24;
        let n: number = 0;
        const g: boolean = year * 372 + month * 31 + ~~(d) >= 588829;
        if (month <= 2) {
            month += 12;
            year--;
        }
        if (g) {
            n = ~~(year / 100);
            n = 2 - n + ~~(n / 4);
        }
        return JulianDay.fromJulianDay(~~(365.25 * (year + 4716)) + ~~(30.6001 * (month + 1)) + d + n - 1524.5);
    }

    getDay(): number {
        return this.day;
    }

    getName(): string {
        return `${this.day}`
    }

    next(n: number): JulianDay {
        return JulianDay.fromJulianDay(this.day + n);
    }

    getSolarDay(): SolarDay {
        let d: number = ~~(this.day + 0.5);
        let f: number = this.day + 0.5 - d;
        let c;

        if (d >= 2299161) {
            c = ~~((d - 1867216.25) / 36524.25);
            d += 1 + c - ~~(c / 4);
        }
        d += 1524;
        let year: number = ~~((d - 122.1) / 365.25);
        d -= ~~(365.25 * year);
        let month: number = ~~(d / 30.601);
        d -= ~~(30.601 * month);
        let day: number = d;
        if (month > 13) {
            month -= 13;
            year -= 4715;
        } else {
            month -= 1;
            year -= 4716;
        }
        f *= 24;
        let hour: number = ~~(f);

        f -= hour;
        f *= 60;
        let minute: number = ~~(f);

        f -= minute;
        f *= 60;
        const second: number = Math.round(f);
        if (second > 59) {
            minute++;
        }
        if (minute > 59) {
            hour++;
        }
        if (hour > 23) {
            day += 1;
        }
        return SolarDay.fromYmd(year, month, day);
    }

    getSolarTime(): SolarTime {
        let d: number = ~~(this.day + 0.5);
        let f: number = this.day + 0.5 - d;
        let c;

        if (d >= 2299161) {
            c = ~~((d - 1867216.25) / 36524.25);
            d += 1 + c - ~~(c / 4);
        }
        d += 1524;
        let year: number = ~~((d - 122.1) / 365.25);
        d -= ~~(365.25 * year);
        let month: number = ~~(d / 30.601);
        d -= ~~(30.601 * month);
        let day: number = d;
        if (month > 13) {
            month -= 13;
            year -= 4715;
        } else {
            month -= 1;
            year -= 4716;
        }
        f *= 24;
        let hour: number = ~~(f);

        f -= hour;
        f *= 60;
        let minute: number = ~~(f);

        f -= minute;
        f *= 60;
        let second: number = Math.round(f);
        if (second > 59) {
            second -= 60;
            minute++;
        }
        if (minute > 59) {
            minute -= 60;
            hour++;
        }
        if (hour > 23) {
            hour -= 24;
            day += 1;
        }
        return SolarTime.fromYmdHms(year, month, day, hour, minute, second);
    }

    getWeek(): Week {
        return Week.fromIndex(~~(this.day + 0.5) + 7000001);
    }
}

export class ShouXingUtil {
    static PI_2: number = 2 * Math.PI;
    static ONE_THIRD: number = 1.0 / 3;
    static SECOND_PER_DAY: number = 86400;
    static SECOND_PER_RAD: number = 648000 / Math.PI;

    private static NUT_B: number[] = [
        2.1824, -33.75705, 36e-6, -1720, 920,
        3.5069, 1256.66393, 11e-6, -132, 57,
        1.3375, 16799.4182, -51e-6, -23, 10,
        4.3649, -67.5141, 72e-6, 21, -9,
        0.04, -628.302, 0, -14, 0,
        2.36, 8328.691, 0, 7, 0,
        3.46, 1884.966, 0, -5, 2,
        5.44, 16833.175, 0, -4, 2,
        3.69, 25128.110, 0, -3, 0,
        3.55, 628.362, 0, 2, 0
    ];
    private static DT_AT: number[] = [
        -4000, 108371.7, -13036.80, 392.000, 0.0000,
        -500, 17201.0, -627.82, 16.170, -0.3413,
        -150, 12200.6, -346.41, 5.403, -0.1593,
        150, 9113.8, -328.13, -1.647, 0.0377,
        500, 5707.5, -391.41, 0.915, 0.3145,
        900, 2203.4, -283.45, 13.034, -0.1778,
        1300, 490.1, -57.35, 2.085, -0.0072,
        1600, 120.0, -9.81, -1.532, 0.1403,
        1700, 10.2, -0.91, 0.510, -0.0370,
        1800, 13.4, -0.72, 0.202, -0.0193,
        1830, 7.8, -1.81, 0.416, -0.0247,
        1860, 8.3, -0.13, -0.406, 0.0292,
        1880, -5.4, 0.32, -0.183, 0.0173,
        1900, -2.3, 2.06, 0.169, -0.0135,
        1920, 21.2, 1.69, -0.304, 0.0167,
        1940, 24.2, 1.22, -0.064, 0.0031,
        1960, 33.2, 0.51, 0.231, -0.0109,
        1980, 51.0, 1.29, -0.026, 0.0032,
        2000, 63.87, 0.1, 0, 0,
        2005, 64.7, 0.21, 0, 0,
        2012, 66.8, 0.22, 0, 0,
        2018, 69.0, 0.36, 0, 0,
        2028, 72.6
    ];
    private static XL0: number[] = [
        10000000000,
        20, 578, 920, 1100, 1124, 1136, 1148, 1217, 1226, 1229, 1229, 1229, 1229, 1937, 2363, 2618, 2633, 2660, 2666,
        17534704567, 0.00000000000, 0.00000000000, 334165646, 4.669256804, 6283.075849991, 3489428, 4.6261024,
        12566.1517000, 349706, 2.744118, 5753.384885, 341757, 2.828866, 3.523118, 313590, 3.627670, 77713.771468,
        267622, 4.418084, 7860.419392, 234269, 6.135162, 3930.209696, 132429, 0.742464, 11506.769770, 127317, 2.037097,
        529.690965, 119917, 1.109629, 1577.343542, 99025, 5.23268, 5884.92685, 90186, 2.04505, 26.29832, 85722, 3.50849,
        398.14900, 77979, 1.17883, 5223.69392, 75314, 2.53339, 5507.55324, 50526, 4.58293, 18849.22755, 49238, 4.20507,
        775.52261, 35666, 2.91954, 0.06731, 31709, 5.84902, 11790.62909, 28413, 1.89869, 796.29801, 27104, 0.31489,
        10977.07880, 24281, 0.34481, 5486.77784, 20616, 4.80647, 2544.31442, 20539, 1.86948, 5573.14280, 20226, 2.45768,
        6069.77675, 15552, 0.83306, 213.29910, 13221, 3.41118, 2942.46342, 12618, 1.08303, 20.77540, 11513, 0.64545,
        0.98032, 10285, 0.63600, 4694.00295, 10190, 0.97569, 15720.83878, 10172, 4.26680, 7.11355, 9921, 6.2099,
        2146.1654, 9761, 0.6810, 155.4204, 8580, 5.9832, 161000.6857, 8513, 1.2987, 6275.9623, 8471, 3.6708, 71430.6956,
        7964, 1.8079, 17260.1547, 7876, 3.0370, 12036.4607, 7465, 1.7551, 5088.6288, 7387, 3.5032, 3154.6871, 7355,
        4.6793, 801.8209, 6963, 0.8330, 9437.7629, 6245, 3.9776, 8827.3903, 6115, 1.8184, 7084.8968, 5696, 2.7843,
        6286.5990, 5612, 4.3869, 14143.4952, 5558, 3.4701, 6279.5527, 5199, 0.1891, 12139.5535, 5161, 1.3328, 1748.0164,
        5115, 0.2831, 5856.4777, 4900, 0.4874, 1194.4470, 4104, 5.3682, 8429.2413, 4094, 2.3985, 19651.0485, 3920,
        6.1683, 10447.3878, 3677, 6.0413, 10213.2855, 3660, 2.5696, 1059.3819, 3595, 1.7088, 2352.8662, 3557, 1.7760,
        6812.7668, 3329, 0.5931, 17789.8456, 3041, 0.4429, 83996.8473, 3005, 2.7398, 1349.8674, 2535, 3.1647, 4690.4798,
        2474, 0.2148, 3.5904, 2366, 0.4847, 8031.0923, 2357, 2.0653, 3340.6124, 2282, 5.2220, 4705.7323, 2189, 5.5559,
        553.5694, 2142, 1.4256, 16730.4637, 2109, 4.1483, 951.7184, 2030, 0.3713, 283.8593, 1992, 5.2221, 12168.0027,
        1986, 5.7747, 6309.3742, 1912, 3.8222, 23581.2582, 1889, 5.3863, 149854.4001, 1790, 2.2149, 13367.9726, 1748,
        4.5605, 135.0651, 1622, 5.9884, 11769.8537, 1508, 4.1957, 6256.7775, 1442, 4.1932, 242.7286, 1435, 3.7236,
        38.0277, 1397, 4.4014, 6681.2249, 1362, 1.8893, 7632.9433, 1250, 1.1305, 5.5229, 1205, 2.6223, 955.5997, 1200,
        1.0035, 632.7837, 1129, 0.1774, 4164.3120, 1083, 0.3273, 103.0928, 1052, 0.9387, 11926.2544, 1050, 5.3591,
        1592.5960, 1033, 6.1998, 6438.4962, 1001, 6.0291, 5746.2713, 980, 0.999, 11371.705, 980, 5.244, 27511.468, 938,
        2.624, 5760.498, 923, 0.483, 522.577, 922, 4.571, 4292.331, 905, 5.337, 6386.169, 862, 4.165, 7058.598, 841,
        3.299, 7234.794, 836, 4.539, 25132.303, 813, 6.112, 4732.031, 812, 6.271, 426.598, 801, 5.821, 28.449, 787,
        0.996, 5643.179, 776, 2.957, 23013.540, 769, 3.121, 7238.676, 758, 3.974, 11499.656, 735, 4.386, 316.392, 731,
        0.607, 11513.883, 719, 3.998, 74.782, 706, 0.323, 263.084, 676, 5.911, 90955.552, 663, 3.665, 17298.182, 653,
        5.791, 18073.705, 630, 4.717, 6836.645, 615, 1.458, 233141.314, 612, 1.075, 19804.827, 596, 3.321, 6283.009,
        596, 2.876, 6283.143, 555, 2.452, 12352.853, 541, 5.392, 419.485, 531, 0.382, 31441.678, 519, 4.065, 6208.294,
        513, 2.361, 10973.556, 494, 5.737, 9917.697, 450, 3.272, 11015.106, 449, 3.653, 206.186, 447, 2.064, 7079.374,
        435, 4.423, 5216.580, 421, 1.906, 245.832, 413, 0.921, 3738.761, 402, 0.840, 20.355, 387, 1.826, 11856.219, 379,
        2.344, 3.881, 374, 2.954, 3128.389, 370, 5.031, 536.805, 365, 1.018, 16200.773, 365, 1.083, 88860.057, 352,
        5.978, 3894.182, 352, 2.056, 244287.600, 351, 3.713, 6290.189, 340, 1.106, 14712.317, 339, 0.978, 8635.942, 339,
        3.202, 5120.601, 333, 0.837, 6496.375, 325, 3.479, 6133.513, 316, 5.089, 21228.392, 316, 1.328, 10873.986, 309,
        3.646, 10.637, 303, 1.802, 35371.887, 296, 3.397, 9225.539, 288, 6.026, 154717.610, 281, 2.585, 14314.168, 262,
        3.856, 266.607, 262, 2.579, 22483.849, 257, 1.561, 23543.231, 255, 3.949, 1990.745, 251, 3.744, 10575.407, 240,
        1.161, 10984.192, 238, 0.106, 7.046, 236, 4.272, 6040.347, 234, 3.577, 10969.965, 211, 3.714, 65147.620, 210,
        0.754, 13521.751, 207, 4.228, 5650.292, 202, 0.814, 170.673, 201, 4.629, 6037.244, 200, 0.381, 6172.870, 199,
        3.933, 6206.810, 199, 5.197, 6262.300, 197, 1.046, 18209.330, 195, 1.070, 5230.807, 195, 4.869, 36.028, 194,
        4.313, 6244.943, 192, 1.229, 709.933, 192, 5.595, 6282.096, 192, 0.602, 6284.056, 189, 3.744, 23.878, 188,
        1.904, 15.252, 188, 0.867, 22003.915, 182, 3.681, 15110.466, 181, 0.491, 1.484, 179, 3.222, 39302.097, 179,
        1.259, 12559.038,
        62833196674749, 0.000000000000, 0.000000000000, 20605886, 2.67823456, 6283.07584999, 430343, 2.635127,
        12566.151700, 42526, 1.59047, 3.52312, 11926, 5.79557, 26.29832, 10898, 2.96618, 1577.34354, 9348, 2.5921,
        18849.2275, 7212, 1.1385, 529.6910, 6777, 1.8747, 398.1490, 6733, 4.4092, 5507.5532, 5903, 2.8880, 5223.6939,
        5598, 2.1747, 155.4204, 4541, 0.3980, 796.2980, 3637, 0.4662, 775.5226, 2896, 2.6471, 7.1135, 2084, 5.3414,
        0.9803, 1910, 1.8463, 5486.7778, 1851, 4.9686, 213.2991, 1729, 2.9912, 6275.9623, 1623, 0.0322, 2544.3144, 1583,
        1.4305, 2146.1654, 1462, 1.2053, 10977.0788, 1246, 2.8343, 1748.0164, 1188, 3.2580, 5088.6288, 1181, 5.2738,
        1194.4470, 1151, 2.0750, 4694.0030, 1064, 0.7661, 553.5694, 997, 1.303, 6286.599, 972, 4.239, 1349.867, 945,
        2.700, 242.729, 858, 5.645, 951.718, 758, 5.301, 2352.866, 639, 2.650, 9437.763, 610, 4.666, 4690.480, 583,
        1.766, 1059.382, 531, 0.909, 3154.687, 522, 5.661, 71430.696, 520, 1.854, 801.821, 504, 1.425, 6438.496, 433,
        0.241, 6812.767, 426, 0.774, 10447.388, 413, 5.240, 7084.897, 374, 2.001, 8031.092, 356, 2.429, 14143.495, 350,
        4.800, 6279.553, 337, 0.888, 12036.461, 337, 3.862, 1592.596, 325, 3.400, 7632.943, 322, 0.616, 8429.241, 318,
        3.188, 4705.732, 297, 6.070, 4292.331, 295, 1.431, 5746.271, 290, 2.325, 20.355, 275, 0.935, 5760.498, 270,
        4.804, 7234.794, 253, 6.223, 6836.645, 228, 5.003, 17789.846, 225, 5.672, 11499.656, 215, 5.202, 11513.883, 208,
        3.955, 10213.286, 208, 2.268, 522.577, 206, 2.224, 5856.478, 206, 2.550, 25132.303, 203, 0.910, 6256.778, 189,
        0.532, 3340.612, 188, 4.735, 83996.847, 179, 1.474, 4164.312, 178, 3.025, 5.523, 177, 3.026, 5753.385, 159,
        4.637, 3.286, 157, 6.124, 5216.580, 155, 3.077, 6681.225, 154, 4.200, 13367.973, 143, 1.191, 3894.182, 138,
        3.093, 135.065, 136, 4.245, 426.598, 134, 5.765, 6040.347, 128, 3.085, 5643.179, 127, 2.092, 6290.189, 125,
        3.077, 11926.254, 125, 3.445, 536.805, 114, 3.244, 12168.003, 112, 2.318, 16730.464, 111, 3.901, 11506.770, 111,
        5.320, 23.878, 105, 3.750, 7860.419, 103, 2.447, 1990.745, 96, 0.82, 3.88, 96, 4.08, 6127.66, 91, 5.42, 206.19,
        91, 0.42, 7079.37, 88, 5.17, 11790.63, 81, 0.34, 9917.70, 80, 3.89, 10973.56, 78, 2.40, 1589.07, 78, 2.58,
        11371.70, 77, 3.98, 955.60, 77, 3.36, 36.03, 76, 1.30, 103.09, 75, 5.18, 10969.97, 75, 4.96, 6496.37, 73, 5.21,
        38.03, 72, 2.65, 6309.37, 70, 5.61, 3738.76, 69, 2.60, 3496.03, 69, 0.39, 15.25, 69, 2.78, 20.78, 65, 1.13,
        7058.60, 64, 4.28, 28.45, 61, 5.63, 10984.19, 60, 0.73, 419.48, 60, 5.28, 10575.41, 58, 5.55, 17298.18, 58,
        3.19, 4732.03,
        5291887, 0.0000000, 0.0000000, 871984, 1.072097, 6283.075850, 30913, 0.86729, 12566.15170, 2734, 0.0530, 3.5231,
        1633, 5.1883, 26.2983, 1575, 3.6846, 155.4204, 954, 0.757, 18849.228, 894, 2.057, 77713.771, 695, 0.827,
        775.523, 506, 4.663, 1577.344, 406, 1.031, 7.114, 381, 3.441, 5573.143, 346, 5.141, 796.298, 317, 6.053,
        5507.553, 302, 1.192, 242.729, 289, 6.117, 529.691, 271, 0.306, 398.149, 254, 2.280, 553.569, 237, 4.381,
        5223.694, 208, 3.754, 0.980, 168, 0.902, 951.718, 153, 5.759, 1349.867, 145, 4.364, 1748.016, 134, 3.721,
        1194.447, 125, 2.948, 6438.496, 122, 2.973, 2146.165, 110, 1.271, 161000.686, 104, 0.604, 3154.687, 100, 5.986,
        6286.599, 92, 4.80, 5088.63, 89, 5.23, 7084.90, 83, 3.31, 213.30, 76, 3.42, 5486.78, 71, 6.19, 4690.48, 68,
        3.43, 4694.00, 65, 1.60, 2544.31, 64, 1.98, 801.82, 61, 2.48, 10977.08, 50, 1.44, 6836.65, 49, 2.34, 1592.60,
        46, 1.31, 4292.33, 46, 3.81, 149854.40, 43, 0.04, 7234.79, 40, 4.94, 7632.94, 39, 1.57, 71430.70, 38, 3.17,
        6309.37, 35, 0.99, 6040.35, 35, 0.67, 1059.38, 31, 3.18, 2352.87, 31, 3.55, 8031.09, 30, 1.92, 10447.39, 30,
        2.52, 6127.66, 28, 4.42, 9437.76, 28, 2.71, 3894.18, 27, 0.67, 25132.30, 26, 5.27, 6812.77, 25, 0.55, 6279.55,
        23, 1.38, 4705.73, 22, 0.64, 6256.78, 20, 6.07, 640.88,
        28923, 5.84384, 6283.07585, 3496, 0.0000, 0.0000, 1682, 5.4877, 12566.1517, 296, 5.196, 155.420, 129, 4.722,
        3.523, 71, 5.30, 18849.23, 64, 5.97, 242.73, 40, 3.79, 553.57,
        11408, 3.14159, 0.00000, 772, 4.134, 6283.076, 77, 3.84, 12566.15, 42, 0.42, 155.42,
        88, 3.14, 0.00, 17, 2.77, 6283.08, 5, 2.01, 155.42, 3, 2.21, 12566.15,
        27962, 3.19870, 84334.66158, 10164, 5.42249, 5507.55324, 8045, 3.8801, 5223.6939, 4381, 3.7044, 2352.8662, 3193,
        4.0003, 1577.3435, 2272, 3.9847, 1047.7473, 1814, 4.9837, 6283.0758, 1639, 3.5646, 5856.4777, 1444, 3.7028,
        9437.7629, 1430, 3.4112, 10213.2855, 1125, 4.8282, 14143.4952, 1090, 2.0857, 6812.7668, 1037, 4.0566,
        71092.8814, 971, 3.473, 4694.003, 915, 1.142, 6620.890, 878, 4.440, 5753.385, 837, 4.993, 7084.897, 770, 5.554,
        167621.576, 719, 3.602, 529.691, 692, 4.326, 6275.962, 558, 4.410, 7860.419, 529, 2.484, 4705.732, 521, 6.250,
        18073.705,
        903, 3.897, 5507.553, 618, 1.730, 5223.694, 380, 5.244, 2352.866,
        166, 1.627, 84334.662,
        10001398880, 0.00000000000, 0.00000000000, 167069963, 3.098463508, 6283.075849991, 1395602, 3.0552461,
        12566.1517000, 308372, 5.198467, 77713.771468, 162846, 1.173877, 5753.384885, 157557, 2.846852, 7860.419392,
        92480, 5.45292, 11506.76977, 54244, 4.56409, 3930.20970, 47211, 3.66100, 5884.92685, 34598, 0.96369, 5507.55324,
        32878, 5.89984, 5223.69392, 30678, 0.29867, 5573.14280, 24319, 4.27350, 11790.62909, 21183, 5.84715, 1577.34354,
        18575, 5.02194, 10977.07880, 17484, 3.01194, 18849.22755, 10984, 5.05511, 5486.77784, 9832, 0.8868, 6069.7768,
        8650, 5.6896, 15720.8388, 8583, 1.2708, 161000.6857, 6490, 0.2725, 17260.1547, 6292, 0.9218, 529.6910, 5706,
        2.0137, 83996.8473, 5574, 5.2416, 71430.6956, 4938, 3.2450, 2544.3144, 4696, 2.5781, 775.5226, 4466, 5.5372,
        9437.7629, 4252, 6.0111, 6275.9623, 3897, 5.3607, 4694.0030, 3825, 2.3926, 8827.3903, 3749, 0.8295, 19651.0485,
        3696, 4.9011, 12139.5535, 3566, 1.6747, 12036.4607, 3454, 1.8427, 2942.4634, 3319, 0.2437, 7084.8968, 3192,
        0.1837, 5088.6288, 3185, 1.7778, 398.1490, 2846, 1.2134, 6286.5990, 2779, 1.8993, 6279.5527, 2628, 4.5890,
        10447.3878, 2460, 3.7866, 8429.2413, 2393, 4.9960, 5856.4777, 2359, 0.2687, 796.2980, 2329, 2.8078, 14143.4952,
        2210, 1.9500, 3154.6871, 2035, 4.6527, 2146.1654, 1951, 5.3823, 2352.8662, 1883, 0.6731, 149854.4001, 1833,
        2.2535, 23581.2582, 1796, 0.1987, 6812.7668, 1731, 6.1520, 16730.4637, 1717, 4.4332, 10213.2855, 1619, 5.2316,
        17789.8456, 1381, 5.1896, 8031.0923, 1364, 3.6852, 4705.7323, 1314, 0.6529, 13367.9726, 1041, 4.3329,
        11769.8537, 1017, 1.5939, 4690.4798, 998, 4.201, 6309.374, 966, 3.676, 27511.468, 874, 6.064, 1748.016, 779,
        3.674, 12168.003, 771, 0.312, 7632.943, 756, 2.626, 6256.778, 746, 5.648, 11926.254, 693, 2.924, 6681.225, 680,
        1.423, 23013.540, 674, 0.563, 3340.612, 663, 5.661, 11371.705, 659, 3.136, 801.821, 648, 2.650, 19804.827, 615,
        3.029, 233141.314, 612, 5.134, 1194.447, 563, 4.341, 90955.552, 552, 2.091, 17298.182, 534, 5.100, 31441.678,
        531, 2.407, 11499.656, 523, 4.624, 6438.496, 513, 5.324, 11513.883, 477, 0.256, 11856.219, 461, 1.722, 7234.794,
        458, 3.766, 6386.169, 458, 4.466, 5746.271, 423, 1.055, 5760.498, 422, 1.557, 7238.676, 415, 2.599, 7058.598,
        401, 3.030, 1059.382, 397, 1.201, 1349.867, 379, 4.907, 4164.312, 360, 5.707, 5643.179, 352, 3.626, 244287.600,
        348, 0.761, 10973.556, 342, 3.001, 4292.331, 336, 4.546, 4732.031, 334, 3.138, 6836.645, 324, 4.164, 9917.697,
        316, 1.691, 11015.106, 307, 0.238, 35371.887, 298, 1.306, 6283.143, 298, 1.750, 6283.009, 293, 5.738, 16200.773,
        286, 5.928, 14712.317, 281, 3.515, 21228.392, 280, 5.663, 8635.942, 277, 0.513, 26.298, 268, 4.207, 18073.705,
        266, 0.900, 12352.853, 260, 2.962, 25132.303, 255, 2.477, 6208.294, 242, 2.800, 709.933, 231, 1.054, 22483.849,
        229, 1.070, 14314.168, 216, 1.314, 154717.610, 215, 6.038, 10873.986, 200, 0.561, 7079.374, 198, 2.614, 951.718,
        197, 4.369, 167283.762, 186, 2.861, 5216.580, 183, 1.660, 39302.097, 183, 5.912, 3738.761, 175, 2.145, 6290.189,
        173, 2.168, 10575.407, 171, 3.702, 1592.596, 171, 1.343, 3128.389, 164, 5.550, 6496.375, 164, 5.856, 10984.192,
        161, 1.998, 10969.965, 161, 1.909, 6133.513, 157, 4.955, 25158.602, 154, 6.216, 23543.231, 153, 5.357,
        13521.751, 150, 5.770, 18209.330, 150, 5.439, 155.420, 139, 1.778, 9225.539, 139, 1.626, 5120.601, 128, 2.460,
        13916.019, 123, 0.717, 143571.324, 122, 2.654, 88860.057, 121, 4.414, 3894.182, 121, 1.192, 3.523, 120, 4.030,
        553.569, 119, 1.513, 17654.781, 117, 3.117, 14945.316, 113, 2.698, 6040.347, 110, 3.085, 43232.307, 109, 0.998,
        955.600, 108, 2.939, 17256.632, 107, 5.285, 65147.620, 103, 0.139, 11712.955, 103, 5.850, 213.299, 102, 3.046,
        6037.244, 101, 2.842, 8662.240, 100, 3.626, 6262.300, 98, 2.36, 6206.81, 98, 5.11, 6172.87, 98, 2.00, 15110.47,
        97, 2.67, 5650.29, 97, 2.75, 6244.94, 96, 4.02, 6282.10, 96, 5.31, 6284.06, 92, 0.10, 29088.81, 85, 3.26,
        20426.57, 84, 2.60, 28766.92, 81, 3.58, 10177.26, 80, 5.81, 5230.81, 78, 2.53, 16496.36, 77, 4.06, 6127.66, 73,
        0.04, 5481.25, 72, 5.96, 12559.04, 72, 5.92, 4136.91, 71, 5.49, 22003.91, 70, 3.41, 7.11, 69, 0.62, 11403.68,
        69, 3.90, 1589.07, 69, 1.96, 12416.59, 69, 4.51, 426.60, 67, 1.61, 11087.29, 66, 4.50, 47162.52, 66, 5.08,
        283.86, 66, 4.32, 16858.48, 65, 1.04, 6062.66, 64, 1.59, 18319.54, 63, 5.70, 45892.73, 63, 4.60, 66567.49, 63,
        3.82, 13517.87, 62, 2.62, 11190.38, 61, 1.54, 33019.02, 60, 5.58, 10344.30, 60, 5.38, 316428.23, 60, 5.78,
        632.78, 59, 6.12, 9623.69, 57, 0.16, 17267.27, 57, 3.86, 6076.89, 57, 1.98, 7668.64, 56, 4.78, 20199.09, 55,
        4.56, 18875.53, 55, 3.51, 17253.04, 54, 3.07, 226858.24, 54, 4.83, 18422.63, 53, 5.02, 12132.44, 52, 3.63,
        5333.90, 52, 0.97, 155427.54, 51, 3.36, 20597.24, 50, 0.99, 11609.86, 50, 2.21, 1990.75, 48, 1.62, 12146.67, 48,
        1.17, 12569.67, 47, 4.62, 5436.99, 47, 1.81, 12562.63, 47, 0.59, 21954.16, 47, 0.76, 7342.46, 46, 0.27, 4590.91,
        46, 3.77, 156137.48, 45, 5.66, 10454.50, 44, 5.84, 3496.03, 43, 0.24, 17996.03, 41, 5.93, 51092.73, 41, 4.21,
        12592.45, 40, 5.14, 1551.05, 40, 5.28, 15671.08, 39, 3.69, 18052.93, 39, 4.94, 24356.78, 38, 2.72, 11933.37, 38,
        5.23, 7477.52, 38, 4.99, 9779.11, 37, 3.70, 9388.01, 37, 4.44, 4535.06, 36, 2.16, 28237.23, 36, 2.54, 242.73,
        36, 0.22, 5429.88, 35, 6.15, 19800.95, 35, 2.92, 36949.23, 34, 5.63, 2379.16, 34, 5.73, 16460.33, 34, 5.11,
        5849.36, 33, 6.19, 6268.85,
        10301861, 1.10748970, 6283.07584999, 172124, 1.064423, 12566.151700, 70222, 3.14159, 0.00000, 3235, 1.0217,
        18849.2275, 3080, 2.8435, 5507.5532, 2497, 1.3191, 5223.6939, 1849, 1.4243, 1577.3435, 1008, 5.9138, 10977.0788,
        865, 1.420, 6275.962, 863, 0.271, 5486.778, 507, 1.686, 5088.629, 499, 6.014, 6286.599, 467, 5.987, 529.691,
        440, 0.518, 4694.003, 410, 1.084, 9437.763, 387, 4.750, 2544.314, 375, 5.071, 796.298, 352, 0.023, 83996.847,
        344, 0.949, 71430.696, 341, 5.412, 775.523, 322, 6.156, 2146.165, 286, 5.484, 10447.388, 284, 3.420, 2352.866,
        255, 6.132, 6438.496, 252, 0.243, 398.149, 243, 3.092, 4690.480, 225, 3.689, 7084.897, 220, 4.952, 6812.767,
        219, 0.420, 8031.092, 209, 1.282, 1748.016, 193, 5.314, 8429.241, 185, 1.820, 7632.943, 175, 3.229, 6279.553,
        173, 1.537, 4705.732, 158, 4.097, 11499.656, 158, 5.539, 3154.687, 150, 3.633, 11513.883, 148, 3.222, 7234.794,
        147, 3.653, 1194.447, 144, 0.817, 14143.495, 135, 6.151, 5746.271, 134, 4.644, 6836.645, 128, 2.693, 1349.867,
        123, 5.650, 5760.498, 118, 2.577, 13367.973, 113, 3.357, 17789.846, 110, 4.497, 4292.331, 108, 5.828, 12036.461,
        102, 5.621, 6256.778, 99, 1.14, 1059.38, 98, 0.66, 5856.48, 93, 2.32, 10213.29, 92, 0.77, 16730.46, 88, 1.50,
        11926.25, 86, 1.42, 5753.38, 85, 0.66, 155.42, 81, 1.64, 6681.22, 80, 4.11, 951.72, 66, 4.55, 5216.58, 65, 0.98,
        25132.30, 64, 4.19, 6040.35, 64, 0.52, 6290.19, 63, 1.51, 5643.18, 59, 6.18, 4164.31, 57, 2.30, 10973.56, 55,
        2.32, 11506.77, 55, 2.20, 1592.60, 55, 5.27, 3340.61, 54, 5.54, 553.57, 53, 5.04, 9917.70, 53, 0.92, 11371.70,
        52, 3.98, 17298.18, 52, 3.60, 10969.97, 49, 5.91, 3894.18, 49, 2.51, 6127.66, 48, 1.67, 12168.00, 46, 0.31,
        801.82, 42, 3.70, 10575.41, 42, 4.05, 10984.19, 40, 2.17, 7860.42, 40, 4.17, 26.30, 38, 5.82, 7058.60, 37, 3.39,
        6496.37, 36, 1.08, 6309.37, 36, 5.34, 7079.37, 34, 3.62, 11790.63, 32, 0.32, 16200.77, 31, 4.24, 3738.76, 29,
        4.55, 11856.22, 29, 1.26, 8635.94, 27, 3.45, 5884.93, 26, 5.08, 10177.26, 26, 5.38, 21228.39, 24, 2.26,
        11712.96, 24, 1.05, 242.73, 24, 5.59, 6069.78, 23, 3.63, 6284.06, 23, 1.64, 4732.03, 22, 3.46, 213.30, 21, 1.05,
        3496.03, 21, 3.92, 13916.02, 21, 4.01, 5230.81, 20, 5.16, 12352.85, 20, 0.69, 1990.75, 19, 2.73, 6062.66, 19,
        5.01, 11015.11, 18, 6.04, 6283.01, 18, 2.85, 7238.68, 18, 5.60, 6283.14, 18, 5.16, 17253.04, 18, 2.54, 14314.17,
        17, 1.58, 7.11, 17, 0.98, 3930.21, 17, 4.75, 17267.27, 16, 2.19, 6076.89, 16, 2.19, 18073.70, 16, 6.12, 3.52,
        16, 4.61, 9623.69, 16, 3.40, 16496.36, 15, 0.19, 9779.11, 15, 5.30, 13517.87, 15, 4.26, 3128.39, 15, 0.81,
        709.93, 14, 0.50, 25158.60, 14, 4.38, 4136.91, 13, 0.98, 65147.62, 13, 3.31, 154717.61, 13, 2.11, 1589.07, 13,
        1.92, 22483.85, 12, 6.03, 9225.54, 12, 1.53, 12559.04, 12, 5.82, 6282.10, 12, 5.61, 5642.20, 12, 2.38,
        167283.76, 12, 0.39, 12132.44, 12, 3.98, 4686.89, 12, 5.81, 12569.67, 12, 0.56, 5849.36, 11, 0.45, 6172.87, 11,
        5.80, 16858.48, 11, 6.22, 12146.67, 11, 2.27, 5429.88,
        435939, 5.784551, 6283.075850, 12363, 5.57935, 12566.15170, 1234, 3.1416, 0.0000, 879, 3.628, 77713.771, 569,
        1.870, 5573.143, 330, 5.470, 18849.228, 147, 4.480, 5507.553, 110, 2.842, 161000.686, 101, 2.815, 5223.694, 85,
        3.11, 1577.34, 65, 5.47, 775.52, 61, 1.38, 6438.50, 50, 4.42, 6286.60, 47, 3.66, 7084.90, 46, 5.39, 149854.40,
        42, 0.90, 10977.08, 40, 3.20, 5088.63, 35, 1.81, 5486.78, 32, 5.35, 3154.69, 30, 3.52, 796.30, 29, 4.62,
        4690.48, 28, 1.84, 4694.00, 27, 3.14, 71430.70, 27, 6.17, 6836.65, 26, 1.42, 2146.17, 25, 2.81, 1748.02, 24,
        2.18, 155.42, 23, 4.76, 7234.79, 21, 3.38, 7632.94, 21, 0.22, 4705.73, 20, 4.22, 1349.87, 20, 2.01, 1194.45, 20,
        4.58, 529.69, 19, 1.59, 6309.37, 18, 5.70, 6040.35, 18, 6.03, 4292.33, 17, 2.90, 9437.76, 17, 2.00, 8031.09, 17,
        5.78, 83996.85, 16, 0.05, 2544.31, 15, 0.95, 6127.66, 14, 0.36, 10447.39, 14, 1.48, 2352.87, 13, 0.77, 553.57,
        13, 5.48, 951.72, 13, 5.27, 6279.55, 13, 3.76, 6812.77, 11, 5.41, 6256.78, 10, 0.68, 1592.60, 10, 4.95, 398.15,
        10, 1.15, 3894.18, 10, 5.20, 244287.60, 10, 1.94, 11856.22, 9, 5.39, 25132.30, 8, 6.18, 1059.38, 8, 0.69,
        8429.24, 8, 5.85, 242.73, 7, 5.26, 14143.50, 7, 0.52, 801.82, 6, 2.24, 8635.94, 6, 4.00, 13367.97, 6, 2.77,
        90955.55, 6, 5.17, 7058.60, 5, 1.46, 233141.31, 5, 4.13, 7860.42, 5, 3.91, 26.30, 5, 3.89, 12036.46, 5, 5.58,
        6290.19, 5, 5.54, 1990.75, 5, 0.83, 11506.77, 5, 6.22, 6681.22, 4, 5.26, 10575.41, 4, 1.91, 7477.52, 4, 0.43,
        10213.29, 4, 1.09, 709.93, 4, 5.09, 11015.11, 4, 4.22, 88860.06, 4, 3.57, 7079.37, 4, 1.98, 6284.06, 4, 3.93,
        10973.56, 4, 6.18, 9917.70, 4, 0.36, 10177.26, 4, 2.75, 3738.76, 4, 3.33, 5643.18, 4, 5.36, 25158.60,
        14459, 4.27319, 6283.07585, 673, 3.917, 12566.152, 77, 0.00, 0.00, 25, 3.73, 18849.23, 4, 2.80, 6286.60,
        386, 2.564, 6283.076, 31, 2.27, 12566.15, 5, 3.44, 5573.14, 2, 2.05, 18849.23, 1, 2.06, 77713.77, 1, 4.41,
        161000.69, 1, 3.82, 149854.40, 1, 4.08, 6127.66, 1, 5.26, 6438.50,
        9, 1.22, 6283.08, 1, 0.66, 12566.15
    ];
    private static XL1: number[][] = [
        [22639.586, 0.78475822, 8328.691424623, 1.5229241, 25.0719, -0.123598, 4586.438, 0.1873974, 7214.06286536, -2.184756, -18.860, 0.08280, 2369.914, 2.5429520, 15542.75428998, -0.661832, 6.212, -0.04080, 769.026, 3.140313, 16657.38284925, 3.04585, 50.144, -0.2472, 666.418, 1.527671, 628.30195521, -0.02664, 0.062, -0.0054, 411.596, 4.826607, 16866.9323150, -1.28012, -1.07, -0.0059, 211.656, 4.115028, -1114.6285593, -3.70768, -43.93, 0.2064, 205.436, 0.230523, 6585.7609101, -2.15812, -18.92, 0.0882, 191.956, 4.898507, 23871.4457146, 0.86109, 31.28, -0.164, 164.729, 2.586078, 14914.4523348, -0.6352, 6.15, -0.035, 147.321, 5.45530, -7700.3894694, -1.5496, -25.01, 0.118, 124.988, 0.48608, 7771.3771450, -0.3309, 3.11, -0.020, 109.380, 3.88323, 8956.9933798, 1.4963, 25.13, -0.129, 55.177, 5.57033, -1324.1780250, 0.6183, 7.3, -0.035, 45.100, 0.89898, 25195.623740, 0.2428, 24.0, -0.129, 39.533, 3.81213, -8538.240890, 2.8030, 26.1, -0.118, 38.430, 4.30115, 22756.817155, -2.8466, -12.6, 0.042, 36.124, 5.49587, 24986.074274, 4.5688, 75.2, -0.371, 30.773, 1.94559, 14428.125731, -4.3695, -37.7, 0.166, 28.397, 3.28586, 7842.364821, -2.2114, -18.8, 0.077, 24.358, 5.64142, 16171.056245, -0.6885, 6.3, -0.046, 18.585, 4.41371, -557.314280, -1.8538, -22.0, 0.10, 17.954, 3.58454, 8399.679100, -0.3576, 3.2, -0.03, 14.530, 4.9416, 23243.143759, 0.888, 31.2, -0.16, 14.380, 0.9709, 32200.137139, 2.384, 56.4, -0.29, 14.251, 5.7641, -2.301200, 1.523, 25.1, -0.12, 13.899, 0.3735, 31085.508580, -1.324, 12.4, -0.08, 13.194, 1.7595, -9443.319984, -5.231, -69.0, 0.33, 9.679, 3.0997, -16029.080894, -3.072, -50.1, 0.24, 9.366, 0.3016, 24080.995180, -3.465, -19.9, 0.08, 8.606, 4.1582, -1742.930514, -3.681, -44.0, 0.21, 8.453, 2.8416, 16100.068570, 1.192, 28.2, -0.14, 8.050, 2.6292, 14286.150380, -0.609, 6.1, -0.03, 7.630, 6.2388, 17285.684804, 3.019, 50.2, -0.25, 7.447, 1.4845, 1256.603910, -0.053, 0.1, -0.01, 7.371, 0.2736, 5957.458955, -2.131, -19.0, 0.09, 7.063, 5.6715, 33.757047, -0.308, -3.6, 0.02, 6.383, 4.7843, 7004.513400, 2.141, 32.4, -0.16, 5.742, 2.6572, 32409.686605, -1.942, 5, -0.05, 4.374, 4.3443, 22128.51520, -2.820, -13, 0.05, 3.998, 3.2545, 33524.31516, 1.766, 49, -0.25, 3.210, 2.2443, 14985.44001, -2.516, -16, 0.06, 2.915, 1.7138, 24499.74767, 0.834, 31, -0.17, 2.732, 1.9887, 13799.82378, -4.343, -38, 0.17, 2.568, 5.4122, -7072.08751, -1.576, -25, 0.11, 2.521, 3.2427, 8470.66678, -2.238, -19, 0.07, 2.489, 4.0719, -486.32660, -3.734, -44, 0.20, 2.146, 5.6135, -1952.47998, 0.645, 7, -0.03, 1.978, 2.7291, 39414.20000, 0.199, 37, -0.21, 1.934, 1.5682, 33314.76570, 6.092, 100, -0.5, 1.871, 0.4166, 30457.20662, -1.297, 12, -0.1, 1.753, 2.0582, -8886.00570, -3.38, -47, 0.2, 1.437, 2.386, -695.87607, 0.59, 7, 0, 1.373, 3.026, -209.54947, 4.33, 51, -0.2, 1.262, 5.940, 16728.37052, 1.17, 28, -0.1, 1.224, 6.172, 6656.74859, -4.04, -41, 0.2, 1.187, 5.873, 6099.43431, -5.89, -63, 0.3, 1.177, 1.014, 31571.83518, 2.41, 56, -0.3, 1.162, 3.840, 9585.29534, 1.47, 25, -0.1, 1.143, 5.639, 8364.73984, -2.18, -19, 0.1, 1.078, 1.229, 70.98768, -1.88, -22, 0.1, 1.059, 3.326, 40528.82856, 3.91, 81, -0.4, 0.990, 5.013, 40738.37803, -0.42, 30, -0.2, 0.948, 5.687, -17772.01141, -6.75, -94, 0.5, 0.876, 0.298, -0.35232, 0, 0, 0, 0.822, 2.994, 393.02097, 0, 0, 0, 0.788, 1.836, 8326.39022, 3.05, 50, -0.2, 0.752, 4.985, 22614.84180, 0.91, 31, -0.2, 0.740, 2.875, 8330.99262, 0, 0, 0, 0.669, 0.744, -24357.77232, -4.60, -75, 0.4, 0.644, 1.314, 8393.12577, -2.18, -19, 0.1, 0.639, 5.888, 575.33849, 0, 0, 0, 0.635, 1.116, 23385.11911, -2.87, -13, 0, 0.584, 5.197, 24428.75999, 2.71, 53, -0.3, 0.583, 3.513, -9095.55517, 0.95, 4, 0, 0.572, 6.059, 29970.88002, -5.03, -32, 0.1, 0.565, 2.960, 0.32863, 1.52, 25, -0.1, 0.561, 4.001, -17981.56087, -2.43, -43, 0.2, 0.557, 0.529, 7143.07519, -0.30, 3, 0, 0.546, 2.311, 25614.37623, 4.54, 75, -0.4, 0.536, 4.229, 15752.30376, -4.99, -45, 0.2, 0.493, 3.316, -8294.9344, -1.83, -29, 0.1, 0.491, 1.744, 8362.4485, 1.21, 21, -0.1, 0.478, 1.803, -10071.6219, -5.20, -69, 0.3, 0.454, 0.857, 15333.2048, 3.66, 57, -0.3, 0.445, 2.071, 8311.7707, -2.18, -19, 0.1, 0.426, 0.345, 23452.6932, -3.44, -20, 0.1, 0.420, 4.941, 33733.8646, -2.56, -2, 0, 0.413, 1.642, 17495.2343, -1.31, -1, 0, 0.404, 1.458, 23314.1314, -0.99, 9, -0.1, 0.395, 2.132, 38299.5714, -3.51, -6, 0, 0.382, 2.700, 31781.3846, -1.92, 5, 0, 0.375, 4.827, 6376.2114, 2.17, 32, -0.2, 0.361, 3.867, 16833.1753, -0.97, 3, 0, 0.358, 5.044, 15056.4277, -4.40, -38, 0.2, 0.350, 5.157, -8257.7037, -3.40, -47, 0.2, 0.344, 4.233, 157.7344, 0, 0, 0, 0.340, 2.672, 13657.8484, -0.58, 6, 0, 0.329, 5.610, 41853.0066, 3.29, 74, -0.4, 0.325, 5.895, -39.8149, 0, 0, 0, 0.309, 4.387, 21500.2132, -2.79, -13, 0.1, 0.302, 1.278, 786.0419, 0, 0, 0, 0.302, 5.341, -24567.3218, -0.27, -24, 0.1, 0.301, 1.045, 5889.8848, -1.57, -12, 0, 0.294, 4.201, -2371.2325, -3.65, -44, 0.2, 0.293, 3.704, 21642.1886, -6.55, -57, 0.2, 0.290, 4.069, 32828.4391, 2.36, 56, -0.3, 0.289, 3.472, 31713.8105, -1.35, 12, -0.1, 0.285, 5.407, -33.7814, 0.31, 4, 0, 0.283, 5.998, -16.9207, -3.71, -44, 0.2, 0.283, 2.772, 38785.8980, 0.23, 37, -0.2, 0.274, 5.343, 15613.7420, -2.54, -16, 0.1, 0.263, 3.997, 25823.9257, 0.22, 24, -0.1, 0.254, 0.600, 24638.3095, -1.61, 2, 0, 0.253, 1.344, 6447.1991, 0.29, 10, -0.1, 0.250, 0.887, 141.9754, -3.76, -44, 0.2, 0.247, 0.317, 5329.1570, -2.10, -19, 0.1, 0.245, 0.141, 36.0484, -3.71, -44, 0.2, 0.231, 2.287, 14357.1381, -2.49, -16, 0.1, 0.227, 5.158, 2.6298, 0, 0, 0, 0.219, 5.085, 47742.8914, 1.72, 63, -0.3, 0.211, 2.145, 6638.7244, -2.18, -19, 0.1, 0.201, 4.415, 39623.7495, -4.13, -14, 0, 0.194, 2.091, 588.4927, 0, 0, 0, 0.193, 3.057, -15400.7789, -3.10, -50, 0, 0.186, 5.598, 16799.3582, -0.72, 6, 0, 0.185, 3.886, 1150.6770, 0, 0, 0, 0.183, 1.619, 7178.0144, 1.52, 25, 0, 0.181, 2.635, 8328.3391, 1.52, 25, 0, 0.181, 2.077, 8329.0437, 1.52, 25, 0, 0.179, 3.215, -9652.8694, -0.90, -18, 0, 0.176, 1.716, -8815.0180, -5.26, -69, 0, 0.175, 5.673, 550.7553, 0, 0, 0, 0.170, 2.060, 31295.0580, -5.6, -39, 0, 0.167, 1.239, 7211.7617, -0.7, 6, 0, 0.165, 4.499, 14967.4158, -0.7, 6, 0, 0.164, 3.595, 15540.4531, 0.9, 31, 0, 0.164, 4.237, 522.3694, 0, 0, 0, 0.163, 4.633, 15545.0555, -2.2, -19, 0, 0.161, 0.478, 6428.0209, -2.2, -19, 0, 0.158, 2.03, 13171.5218, -4.3, -38, 0, 0.157, 2.28, 7216.3641, -3.7, -44, 0, 0.154, 5.65, 7935.6705, 1.5, 25, 0, 0.152, 0.46, 29828.9047, -1.3, 12, 0, 0.151, 1.19, -0.7113, 0, 0, 0, 0.150, 1.42, 23942.4334, -1.0, 9, 0, 0.144, 2.75, 7753.3529, 1.5, 25, 0, 0.137, 2.08, 7213.7105, -2.2, -19, 0, 0.137, 1.44, 7214.4152, -2.2, -19, 0, 0.136, 4.46, -1185.6162, -1.8, -22, 0, 0.136, 3.03, 8000.1048, -2.2, -19, 0, 0.134, 2.83, 14756.7124, -0.7, 6, 0, 0.131, 5.05, 6821.0419, -2.2, -19, 0, 0.128, 5.99, -17214.6971, -4.9, -72, 0, 0.127, 5.35, 8721.7124, 1.5, 25, 0, 0.126, 4.49, 46628.2629, -2.0, 19, 0, 0.125, 5.94, 7149.6285, 1.5, 25, 0, 0.124, 1.09, 49067.0695, 1.1, 55, 0, 0.121, 2.88, 15471.7666, 1.2, 28, 0, 0.111, 3.92, 41643.4571, 7.6, 125, -1, 0.110, 1.96, 8904.0299, 1.5, 25, 0, 0.106, 3.30, -18.0489, -2.2, -19, 0, 0.105, 2.30, -4.9310, 1.5, 25, 0, 0.104, 2.22, -6.5590, -1.9, -22, 0, 0.101, 1.44, 1884.9059, -0.1, 0, 0, 0.100, 5.92, 5471.1324, -5.9, -63, 0, 0.099, 1.12, 15149.7333, -0.7, 6, 0, 0.096, 4.73, 15508.9972, -0.4, 10, 0, 0.095, 5.18, 7230.9835, 1.5, 25, 0, 0.093, 3.37, 39900.5266, 3.9, 81, 0, 0.092, 2.01, 25057.0619, 2.7, 53, 0, 0.092, 1.21, -79.6298, 0, 0, 0, 0.092, 1.65, -26310.2523, -4.0, -68, 0, 0.091, 1.01, 42062.5561, -1.0, 23, 0, 0.090, 6.10, 29342.5781, -5.0, -32, 0, 0.090, 4.43, 15542.4020, -0.7, 6, 0, 0.090, 3.80, 15543.1066, -0.7, 6, 0, 0.089, 4.15, 6063.3859, -2.2, -19, 0, 0.086, 4.03, 52.9691, 0, 0, 0, 0.085, 0.49, 47952.4409, -2.6, 11, 0, 0.085, 1.60, 7632.8154, 2.1, 32, 0, 0.084, 0.22, 14392.0773, -0.7, 6, 0, 0.083, 6.22, 6028.4466, -4.0, -41, 0, 0.083, 0.63, -7909.9389, 2.8, 26, 0, 0.083, 5.20, -77.5523, 0, 0, 0, 0.082, 2.74, 8786.1467, -2.2, -19, 0, 0.080, 2.43, 9166.5428, -2.8, -26, 0, 0.080, 3.70, -25405.1732, 4.1, 27, 0, 0.078, 5.68, 48857.5200, 5.4, 106, -1, 0.077, 1.85, 8315.5735, -2.2, -19, 0, 0.075, 5.46, -18191.1103, 1.9, 8, 0, 0.075, 1.41, -16238.6304, 1.3, 1, 0, 0.074, 5.06, 40110.0761, -0.4, 30, 0, 0.072, 2.10, 64.4343, -3.7, -44, 0, 0.071, 2.17, 37671.2695, -3.5, -6, 0, 0.069, 1.71, 16693.4313, -0.7, 6, 0, 0.069, 3.33, -26100.7028, -8.3, -119, 1, 0.068, 1.09, 8329.4028, 1.5, 25, 0, 0.068, 3.62, 8327.9801, 1.5, 25, 0, 0.068, 2.41, 16833.1509, -1.0, 3, 0, 0.067, 3.40, 24709.2971, -3.5, -20, 0, 0.067, 1.65, 8346.7156, -0.3, 3, 0, 0.066, 2.61, 22547.2677, 1.5, 39, 0, 0.066, 3.50, 15576.5113, -1.0, 3, 0, 0.065, 5.76, 33037.9886, -2.0, 5, 0, 0.065, 4.58, 8322.1325, -0.3, 3, 0, 0.065, 6.20, 17913.9868, 3.0, 50, 0, 0.065, 1.50, 22685.8295, -1.0, 9, 0, 0.065, 2.37, 7180.3058, -1.9, -15, 0, 0.064, 1.06, 30943.5332, 2.4, 56, 0, 0.064, 1.89, 8288.8765, 1.5, 25, 0, 0.064, 4.70, 6.0335, 0.3, 4, 0, 0.063, 2.83, 8368.5063, 1.5, 25, 0, 0.063, 5.66, -2580.7819, 0.7, 7, 0, 0.062, 3.78, 7056.3285, -2.2, -19, 0, 0.061, 1.49, 8294.9100, 1.8, 29, 0, 0.061, 0.12, -10281.1714, -0.9, -18, 0, 0.061, 3.06, -8362.4729, -1.2, -21, 0, 0.061, 4.43, 8170.9571, 1.5, 25, 0, 0.059, 5.78, -13.1179, -3.7, -44, 0, 0.059, 5.97, 6625.5702, -2.2, -19, 0, 0.058, 5.01, -0.5080, -0.3, 0, 0, 0.058, 2.73, 7161.0938, -2.2, -19, 0, 0.057, 0.19, 7214.0629, -2.2, -19, 0, 0.057, 4.00, 22199.5029, -4.7, -35, 0, 0.057, 5.38, 8119.1420, 5.8, 76, 0, 0.056, 1.07, 7542.6495, 1.5, 25, 0, 0.056, 0.28, 8486.4258, 1.5, 25, 0, 0.054, 4.19, 16655.0816, 4.6, 75, 0, 0.053, 0.72, 7267.0320, -2.2, -19, 0, 0.053, 3.12, 12.6192, 0.6, 7, 0, 0.052, 2.99, -32896.013, -1.8, -49, 0, 0.052, 3.46, 1097.708, 0, 0, 0, 0.051, 5.37, -6443.786, -1.6, -25, 0, 0.051, 1.35, 7789.401, -2.2, -19, 0, 0.051, 5.83, 40042.502, 0.2, 38, 0, 0.051, 3.63, 9114.733, 1.5, 25, 0, 0.050, 1.51, 8504.484, -2.5, -22, 0, 0.050, 5.23, 16659.684, 1.5, 25, 0, 0.050, 1.15, 7247.820, -2.5, -23, 0, 0.047, 0.25, -1290.421, 0.3, 0, 0, 0.047, 4.67, -32686.464, -6.1, -100, 0, 0.047, 3.49, 548.678, 0, 0, 0, 0.047, 2.37, 6663.308, -2.2, -19, 0, 0.046, 0.98, 1572.084, 0, 0, 0, 0.046, 2.04, 14954.262, -0.7, 6, 0, 0.046, 3.72, 6691.693, -2.2, -19, 0, 0.045, 6.19, -235.287, 0, 0, 0, 0.044, 2.96, 32967.001, -0.1, 27, 0, 0.044, 3.82, -1671.943, -5.6, -66, 0, 0.043, 5.82, 1179.063, 0, 0, 0, 0.043, 0.07, 34152.617, 1.7, 49, 0, 0.043, 3.71, 6514.773, -0.3, 0, 0, 0.043, 5.62, 15.732, -2.5, -23, 0, 0.043, 5.80, 8351.233, -2.2, -19, 0, 0.042, 0.27, 7740.199, 1.5, 25, 0, 0.042, 6.14, 15385.020, -0.7, 6, 0, 0.042, 6.13, 7285.051, -4.1, -41, 0, 0.041, 1.27, 32757.451, 4.2, 78, 0, 0.041, 4.46, 8275.722, 1.5, 25, 0, 0.040, 0.23, 8381.661, 1.5, 25, 0, 0.040, 5.87, -766.864, 2.5, 29, 0, 0.040, 1.66, 254.431, 0, 0, 0, 0.040, 0.40, 9027.981, -0.4, 0, 0, 0.040, 2.96, 7777.936, 1.5, 25, 0, 0.039, 4.67, 33943.068, 6.1, 100, 0, 0.039, 3.52, 8326.062, 1.5, 25, 0, 0.039, 3.75, 21013.887, -6.5, -57, 0, 0.039, 5.60, 606.978, 0, 0, 0, 0.039, 1.19, 8331.321, 1.5, 25, 0, 0.039, 2.84, 7211.433, -2.2, -19, 0, 0.038, 0.67, 7216.693, -2.2, -19, 0, 0.038, 6.22, 25161.867, 0.6, 28, 0, 0.038, 4.40, 7806.322, 1.5, 25, 0, 0.038, 4.16, 9179.168, -2.2, -19, 0, 0.037, 4.73, 14991.999, -0.7, 6, 0, 0.036, 0.35, 67.514, -0.6, -7, 0, 0.036, 3.70, 25266.611, -1.6, 0, 0, 0.036, 5.39, 16328.796, -0.7, 6, 0, 0.035, 1.44, 7174.248, -2.2, -19, 0, 0.035, 5.00, 15684.730, -4.4, -38, 0, 0.035, 0.39, -15.419, -2.2, -19, 0, 0.035, 6.07, 15020.385, -0.7, 6, 0, 0.034, 6.01, 7371.797, -2.2, -19, 0, 0.034, 0.96, -16623.626, -3.4, -54, 0, 0.033, 6.24, 9479.368, 1.5, 25, 0, 0.033, 3.21, 23661.896, 5.2, 82, 0, 0.033, 4.06, 8311.418, -2.2, -19, 0, 0.033, 2.40, 1965.105, 0, 0, 0, 0.033, 5.17, 15489.785, -0.7, 6, 0, 0.033, 5.03, 21986.540, 0.9, 31, 0, 0.033, 4.10, 16691.140, 2.7, 46, 0, 0.033, 5.13, 47114.589, 1.7, 63, 0, 0.033, 4.45, 8917.184, 1.5, 25, 0, 0.033, 4.23, 2.078, 0, 0, 0, 0.032, 2.33, 75.251, 1.5, 25, 0, 0.032, 2.10, 7253.878, -2.2, -19, 0, 0.032, 3.11, -0.224, 1.5, 25, 0, 0.032, 4.43, 16640.462, -0.7, 6, 0, 0.032, 5.68, 8328.363, 0, 0, 0, 0.031, 5.32, 8329.020, 3.0, 50, 0, 0.031, 3.70, 16118.093, -0.7, 6, 0, 0.030, 3.67, 16721.817, -0.7, 6, 0, 0.030, 5.27, -1881.492, -1.2, -15, 0, 0.030, 5.72, 8157.839, -2.2, -19, 0, 0.029, 5.73, -18400.313, -6.7, -94, 0, 0.029, 2.76, 16.000, -2.2, -19, 0, 0.029, 1.75, 8879.447, 1.5, 25, 0, 0.029, 0.32, 8851.061, 1.5, 25, 0, 0.029, 0.90, 14704.903, 3.7, 57, 0, 0.028, 2.90, 15595.723, -0.7, 6, 0, 0.028, 5.88, 16864.631, 0.2, 24, 0, 0.028, 0.63, 16869.234, -2.8, -26, 0, 0.028, 4.04, -18609.863, -2.4, -43, 0, 0.027, 5.83, 6727.736, -5.9, -63, 0, 0.027, 6.12, 418.752, 4.3, 51, 0, 0.027, 0.14, 41157.131, 3.9, 81, 0, 0.026, 3.80, 15.542, 0, 0, 0, 0.026, 1.68, 50181.698, 4.8, 99, -1, 0.026, 0.32, 315.469, 0, 0, 0, 0.025, 5.67, 19.188, 0.3, 0, 0, 0.025, 3.16, 62.133, -2.2, -19, 0, 0.025, 3.76, 15502.939, -0.7, 6, 0, 0.025, 4.53, 45999.961, -2.0, 19, 0, 0.024, 3.21, 837.851, -4.4, -51, 0, 0.024, 2.82, 38157.596, 0.3, 37, 0, 0.024, 5.21, 15540.124, -0.7, 6, 0, 0.024, 0.26, 14218.576, 0, 13, 0, 0.024, 3.01, 15545.384, -0.7, 6, 0, 0.024, 1.16, -17424.247, -0.6, -21, 0, 0.023, 2.34, -67.574, 0.6, 7, 0, 0.023, 2.44, 18.024, -1.9, -22, 0, 0.023, 3.70, 469.400, 0, 0, 0, 0.023, 0.72, 7136.511, -2.2, -19, 0, 0.023, 4.50, 15582.569, -0.7, 6, 0, 0.023, 2.80, -16586.395, -4.9, -72, 0, 0.023, 1.51, 80.182, 0, 0, 0, 0.023, 1.09, 5261.583, -1.5, -12, 0, 0.023, 0.56, 54956.954, -0.5, 44, 0, 0.023, 4.01, 8550.860, -2.2, -19, 0, 0.023, 4.46, 38995.448, -4.1, -14, 0, 0.023, 3.82, 2358.126, 0, 0, 0, 0.022, 3.77, 32271.125, 0.5, 34, 0, 0.022, 0.82, 15935.775, -0.7, 6, 0, 0.022, 1.07, 24013.421, -2.9, -13, 0, 0.022, 0.40, 8940.078, -2.2, -19, 0, 0.022, 2.06, 15700.489, -0.7, 6, 0, 0.022, 4.27, 15124.002, -5.0, -45, 0, 0.021, 1.16, 56071.583, 3.2, 88, 0, 0.021, 5.58, 9572.189, -2.2, -19, 0, 0.020, 1.70, -17.273, -3.7, -44, 0, 0.020, 3.05, 214.617, 0, 0, 0, 0.020, 4.41, 8391.048, -2.2, -19, 0, 0.020, 5.95, 23869.145, 2.4, 56, 0, 0.020, 0.42, 40947.927, -4.7, -21, 0, 0.019, 1.39, 5818.897, 0.3, 10, 0, 0.019, 0.71, 23873.747, -0.7, 6, 0, 0.019, 2.81, 7291.615, -2.2, -19, 0, 0.019, 5.09, 8428.018, -2.2, -19, 0, 0.019, 4.14, 6518.187, -1.6, -12, 0, 0.019, 3.85, 21.330, 0, 0, 0, 0.018, 0.66, 14445.046, -0.7, 6, 0, 0.018, 1.65, 0.966, -4.0, -48, 0, 0.018, 5.64, -17143.709, -6.8, -94, 0, 0.018, 6.01, 7736.432, -2.2, -19, 0, 0.018, 2.74, 31153.083, -1.9, 5, 0, 0.018, 4.58, 6116.355, -2.2, -19, 0, 0.018, 2.28, 46.401, 0.3, 0, 0, 0.018, 3.80, 10213.597, 1.4, 25, 0, 0.018, 2.84, 56281.132, -1.1, 36, 0, 0.018, 3.53, 8249.062, 1.5, 25, 0, 0.017, 4.43, 20871.911, -3, -13, 0, 0.017, 4.44, 627.596, 0, 0, 0, 0.017, 1.85, 628.308, 0, 0, 0, 0.017, 1.19, 8408.321, 2, 25, 0, 0.017, 1.95, 7214.056, -2, -19, 0, 0.017, 1.57, 7214.070, -2, -19, 0, 0.017, 1.65, 13870.811, -6, -60, 0, 0.017, 0.30, 22.542, -4, -44, 0, 0.017, 2.62, -119.445, 0, 0, 0, 0.016, 4.87, 5747.909, 2, 32, 0, 0.016, 4.45, 14339.108, -1, 6, 0, 0.016, 1.83, 41366.680, 0, 30, 0, 0.016, 4.53, 16309.618, -3, -23, 0, 0.016, 2.54, 15542.754, -1, 6, 0, 0.016, 6.05, 1203.646, 0, 0, 0, 0.015, 5.2, 2751.147, 0, 0, 0, 0.015, 1.8, -10699.924, -5, -69, 0, 0.015, 0.4, 22824.391, -3, -20, 0, 0.015, 2.1, 30666.756, -6, -39, 0, 0.015, 2.1, 6010.417, -2, -19, 0, 0.015, 0.7, -23729.470, -5, -75, 0, 0.015, 1.4, 14363.691, -1, 6, 0, 0.015, 5.8, 16900.689, -2, 0, 0, 0.015, 5.2, 23800.458, 3, 53, 0, 0.015, 5.3, 6035.000, -2, -19, 0, 0.015, 1.2, 8251.139, 2, 25, 0, 0.015, 3.6, -8.860, 0, 0, 0, 0.015, 0.8, 882.739, 0, 0, 0, 0.015, 3.0, 1021.329, 0, 0, 0, 0.015, 0.6, 23296.107, 1, 31, 0, 0.014, 5.4, 7227.181, 2, 25, 0, 0.014, 0.1, 7213.352, -2, -19, 0, 0.014, 4.0, 15506.706, 3, 50, 0, 0.014, 3.4, 7214.774, -2, -19, 0, 0.014, 4.6, 6665.385, -2, -19, 0, 0.014, 0.1, -8.636, -2, -22, 0, 0.014, 3.1, 15465.202, -1, 6, 0, 0.014, 4.9, 508.863, 0, 0, 0, 0.014, 3.5, 8406.244, 2, 25, 0, 0.014, 1.3, 13313.497, -8, -82, 0, 0.014, 2.8, 49276.619, -3, 0, 0, 0.014, 0.1, 30528.194, -3, -10, 0, 0.013, 1.7, 25128.050, 1, 31, 0, 0.013, 2.9, 14128.405, -1, 6, 0, 0.013, 3.4, 57395.761, 3, 80, 0, 0.013, 2.7, 13029.546, -1, 6, 0, 0.013, 3.9, 7802.556, -2, -19, 0, 0.013, 1.6, 8258.802, -2, -19, 0, 0.013, 2.2, 8417.709, -2, -19, 0, 0.013, 0.7, 9965.210, -2, -19, 0, 0.013, 3.4, 50391.247, 0, 48, 0, 0.013, 3.0, 7134.433, -2, -19, 0, 0.013, 2.9, 30599.182, -5, -31, 0, 0.013, 3.6, -9723.857, 1, 0, 0, 0.013, 4.8, 7607.084, -2, -19, 0, 0.012, 0.8, 23837.689, 1, 35, 0, 0.012, 3.6, 4.409, -4, -44, 0, 0.012, 5.0, 16657.031, 3, 50, 0, 0.012, 4.4, 16657.735, 3, 50, 0, 0.012, 1.1, 15578.803, -4, -38, 0, 0.012, 6.0, -11.490, 0, 0, 0, 0.012, 1.9, 8164.398, 0, 0, 0, 0.012, 2.4, 31852.372, -4, -17, 0, 0.012, 2.4, 6607.085, -2, -19, 0, 0.012, 4.2, 8359.870, 0, 0, 0, 0.012, 0.5, 5799.713, -2, -19, 0, 0.012, 2.7, 7220.622, 0, 0, 0, 0.012, 4.3, -139.720, 0, 0, 0, 0.012, 2.3, 13728.836, -2, -16, 0, 0.011, 3.6, 14912.146, 1, 31, 0, 0.011, 4.7, 14916.748, -2, -19, 0],
        [1.67680, 4.66926, 628.301955, -0.0266, 0.1, -0.005, 0.51642, 3.3721, 6585.760910, -2.158, -18.9, 0.09, 0.41383, 5.7277, 14914.452335, -0.635, 6.2, -0.04, 0.37115, 3.9695, 7700.389469, 1.550, 25.0, -0.12, 0.27560, 0.7416, 8956.993380, 1.496, 25.1, -0.13, 0.24599, 4.2253, -2.301200, 1.523, 25.1, -0.12, 0.07118, 0.1443, 7842.36482, -2.211, -19, 0.08, 0.06128, 2.4998, 16171.05625, -0.688, 6, 0, 0.04516, 0.443, 8399.67910, -0.36, 3, 0, 0.04048, 5.771, 14286.15038, -0.61, 6, 0, 0.03747, 4.626, 1256.60391, -0.05, 0, 0, 0.03707, 3.415, 5957.45895, -2.13, -19, 0.1, 0.03649, 1.800, 23243.14376, 0.89, 31, -0.2, 0.02438, 0.042, 16029.08089, 3.07, 50, -0.2, 0.02165, 1.017, -1742.93051, -3.68, -44, 0.2, 0.01923, 3.097, 17285.68480, 3.02, 50, -0.3, 0.01692, 1.280, 0.3286, 1.52, 25, -0.1, 0.01361, 0.298, 8326.3902, 3.05, 50, -0.2, 0.01293, 4.013, 7072.0875, 1.58, 25, -0.1, 0.01276, 4.413, 8330.9926, 0, 0, 0, 0.01270, 0.101, 8470.6668, -2.24, -19, 0.1, 0.01097, 1.203, 22128.5152, -2.82, -13, 0, 0.01088, 2.545, 15542.7543, -0.66, 6, 0, 0.00835, 0.190, 7214.0629, -2.18, -19, 0.1, 0.00734, 4.855, 24499.7477, 0.83, 31, -0.2, 0.00686, 5.130, 13799.8238, -4.34, -38, 0.2, 0.00631, 0.930, -486.3266, -3.73, -44, 0, 0.00585, 0.699, 9585.2953, 1.5, 25, 0, 0.00566, 4.073, 8328.3391, 1.5, 25, 0, 0.00566, 0.638, 8329.0437, 1.5, 25, 0, 0.00539, 2.472, -1952.4800, 0.6, 7, 0, 0.00509, 2.88, -0.7113, 0, 0, 0, 0.00469, 3.56, 30457.2066, -1.3, 12, 0, 0.00387, 0.78, -0.3523, 0, 0, 0, 0.00378, 1.84, 22614.8418, 0.9, 31, 0, 0.00362, 5.53, -695.8761, 0.6, 7, 0, 0.00317, 2.80, 16728.3705, 1.2, 28, 0, 0.00303, 6.07, 157.7344, 0, 0, 0, 0.00300, 2.53, 33.7570, -0.3, -4, 0, 0.00295, 4.16, 31571.8352, 2.4, 56, 0, 0.00289, 5.98, 7211.7617, -0.7, 6, 0, 0.00285, 2.06, 15540.4531, 0.9, 31, 0, 0.00283, 2.65, 2.6298, 0, 0, 0, 0.00282, 6.17, 15545.0555, -2.2, -19, 0, 0.00278, 1.23, -39.8149, 0, 0, 0, 0.00272, 3.82, 7216.3641, -3.7, -44, 0, 0.00270, 4.37, 70.9877, -1.9, -22, 0, 0.00256, 5.81, 13657.8484, -0.6, 6, 0, 0.00244, 5.64, -0.2237, 1.5, 25, 0, 0.00240, 2.96, 8311.7707, -2.2, -19, 0, 0.00239, 0.87, -33.7814, 0.3, 4, 0, 0.00216, 2.31, 15.9995, -2.2, -19, 0, 0.00186, 3.46, 5329.1570, -2.1, -19, 0, 0.00169, 2.40, 24357.772, 4.6, 75, 0, 0.00161, 5.80, 8329.403, 1.5, 25, 0, 0.00161, 5.20, 8327.980, 1.5, 25, 0, 0.00160, 4.26, 23385.119, -2.9, -13, 0, 0.00156, 1.26, 550.755, 0, 0, 0, 0.00155, 1.25, 21500.213, -2.8, -13, 0, 0.00152, 0.60, -16.921, -3.7, -44, 0, 0.00150, 2.71, -79.630, 0, 0, 0, 0.00150, 5.29, 15.542, 0, 0, 0, 0.00148, 1.06, -2371.232, -3.7, -44, 0, 0.00141, 0.77, 8328.691, 1.5, 25, 0, 0.00141, 3.67, 7143.075, -0.3, 0, 0, 0.00138, 5.45, 25614.376, 4.5, 75, 0, 0.00129, 4.90, 23871.446, 0.9, 31, 0, 0.00126, 4.03, 141.975, -3.8, -44, 0, 0.00124, 6.01, 522.369, 0, 0, 0, 0.00120, 4.94, -10071.622, -5.2, -69, 0, 0.00118, 5.07, -15.419, -2.2, -19, 0, 0.00107, 3.49, 23452.693, -3.4, -20, 0, 0.00104, 4.78, 17495.234, -1.3, 0, 0, 0.00103, 1.44, -18.049, -2.2, -19, 0, 0.00102, 5.63, 15542.402, -0.7, 6, 0, 0.00102, 2.59, 15543.107, -0.7, 6, 0, 0.00100, 4.11, -6.559, -1.9, -22, 0, 0.00097, 0.08, 15400.779, 3.1, 50, 0, 0.00096, 5.84, 31781.385, -1.9, 5, 0, 0.00094, 1.08, 8328.363, 0, 0, 0, 0.00094, 2.46, 16799.358, -0.7, 6, 0, 0.00094, 1.69, 6376.211, 2.2, 32, 0, 0.00093, 3.64, 8329.020, 3.0, 50, 0, 0.00093, 2.65, 16655.082, 4.6, 75, 0, 0.00090, 1.90, 15056.428, -4.4, -38, 0, 0.00089, 1.59, 52.969, 0, 0, 0, 0.00088, 2.02, -8257.704, -3.4, -47, 0, 0.00088, 3.02, 7213.711, -2.2, -19, 0, 0.00087, 0.50, 7214.415, -2.2, -19, 0, 0.00087, 0.49, 16659.684, 1.5, 25, 0, 0.00082, 5.64, -4.931, 1.5, 25, 0, 0.00079, 5.17, 13171.522, -4.3, -38, 0, 0.00076, 3.60, 29828.905, -1.3, 12, 0, 0.00076, 4.08, 24567.322, 0.3, 24, 0, 0.00076, 4.58, 1884.906, -0.1, 0, 0, 0.00073, 0.33, 31713.811, -1.4, 12, 0, 0.00073, 0.93, 32828.439, 2.4, 56, 0, 0.00071, 5.91, 38785.898, 0.2, 37, 0, 0.00069, 2.20, 15613.742, -2.5, -16, 0, 0.00066, 3.87, 15.732, -2.5, -23, 0, 0.00066, 0.86, 25823.926, 0.2, 24, 0, 0.00065, 2.52, 8170.957, 1.5, 25, 0, 0.00063, 0.18, 8322.132, -0.3, 0, 0, 0.00060, 5.84, 8326.062, 1.5, 25, 0, 0.00060, 5.15, 8331.321, 1.5, 25, 0, 0.00060, 2.18, 8486.426, 1.5, 25, 0, 0.00058, 2.30, -1.731, -4, -44, 0, 0.00058, 5.43, 14357.138, -2, -16, 0, 0.00057, 3.09, 8294.910, 2, 29, 0, 0.00057, 4.67, -8362.473, -1, -21, 0, 0.00056, 4.15, 16833.151, -1, 0, 0, 0.00054, 1.93, 7056.329, -2, -19, 0, 0.00054, 5.27, 8315.574, -2, -19, 0, 0.00052, 5.6, 8311.418, -2, -19, 0, 0.00052, 2.7, -77.552, 0, 0, 0, 0.00051, 4.3, 7230.984, 2, 25, 0, 0.00050, 0.4, -0.508, 0, 0, 0, 0.00049, 5.4, 7211.433, -2, -19, 0, 0.00049, 4.4, 7216.693, -2, -19, 0, 0.00049, 4.3, 16864.631, 0, 24, 0, 0.00049, 2.2, 16869.234, -3, -26, 0, 0.00047, 6.1, 627.596, 0, 0, 0, 0.00047, 5.0, 12.619, 1, 7, 0, 0.00045, 4.9, -8815.018, -5, -69, 0, 0.00044, 1.6, 62.133, -2, -19, 0, 0.00042, 2.9, -13.118, -4, -44, 0, 0.00042, 4.1, -119.445, 0, 0, 0, 0.00041, 4.3, 22756.817, -3, -13, 0, 0.00041, 3.6, 8288.877, 2, 25, 0, 0.00040, 0.5, 6663.308, -2, -19, 0, 0.00040, 1.1, 8368.506, 2, 25, 0, 0.00039, 4.1, 6443.786, 2, 25, 0, 0.00039, 3.1, 16657.383, 3, 50, 0, 0.00038, 0.1, 16657.031, 3, 50, 0, 0.00038, 3.0, 16657.735, 3, 50, 0, 0.00038, 4.6, 23942.433, -1, 9, 0, 0.00037, 4.3, 15385.020, -1, 6, 0, 0.00037, 5.0, 548.678, 0, 0, 0, 0.00036, 1.8, 7213.352, -2, -19, 0, 0.00036, 1.7, 7214.774, -2, -19, 0, 0.00035, 1.1, 7777.936, 2, 25, 0, 0.00035, 1.6, -8.860, 0, 0, 0, 0.00035, 4.4, 23869.145, 2, 56, 0, 0.00035, 2.0, 6691.693, -2, -19, 0, 0.00034, 1.3, -1185.616, -2, -22, 0, 0.00034, 2.2, 23873.747, -1, 6, 0, 0.00033, 2.0, -235.287, 0, 0, 0, 0.00033, 3.1, 17913.987, 3, 50, 0, 0.00033, 1.0, 8351.233, -2, -19, 0],
        [0.004870, 4.6693, 628.30196, -0.027, 0, -0.01, 0.002280, 2.6746, -2.30120, 1.523, 25, -0.12, 0.001500, 3.372, 6585.76091, -2.16, -19, 0.1, 0.001200, 5.728, 14914.45233, -0.64, 6, 0, 0.001080, 3.969, 7700.38947, 1.55, 25, -0.1, 0.000800, 0.742, 8956.99338, 1.50, 25, -0.1, 0.000254, 6.002, 0.3286, 1.52, 25, -0.1, 0.000210, 0.144, 7842.3648, -2.21, -19, 0, 0.000180, 2.500, 16171.0562, -0.7, 6, 0, 0.000130, 0.44, 8399.6791, -0.4, 3, 0, 0.000126, 5.03, 8326.3902, 3.0, 50, 0, 0.000120, 5.77, 14286.1504, -0.6, 6, 0, 0.000118, 5.96, 8330.9926, 0, 0, 0, 0.000110, 1.80, 23243.1438, 0.9, 31, 0, 0.000110, 3.42, 5957.4590, -2.1, -19, 0, 0.000110, 4.63, 1256.6039, -0.1, 0, 0, 0.000099, 4.70, -0.7113, 0, 0, 0, 0.000070, 0.04, 16029.0809, 3.1, 50, 0, 0.000070, 5.14, 8328.3391, 1.5, 25, 0, 0.000070, 5.85, 8329.0437, 1.5, 25, 0, 0.000060, 1.02, -1742.9305, -3.7, -44, 0, 0.000060, 3.10, 17285.6848, 3.0, 50, 0, 0.000054, 5.69, -0.352, 0, 0, 0, 0.000043, 0.52, 15.542, 0, 0, 0, 0.000041, 2.03, 2.630, 0, 0, 0, 0.000040, 0.10, 8470.667, -2.2, -19, 0, 0.000040, 4.01, 7072.088, 1.6, 25, 0, 0.000036, 2.93, -8.860, -0.3, 0, 0, 0.000030, 1.20, 22128.515, -2.8, -13, 0, 0.000030, 2.54, 15542.754, -0.7, 6, 0, 0.000027, 4.43, 7211.762, -0.7, 6, 0, 0.000026, 0.51, 15540.453, 0.9, 31, 0, 0.000026, 1.44, 15545.055, -2.2, -19, 0, 0.000025, 5.37, 7216.364, -3.7, -44, 0],
        [0.00001200, 1.041, -2.3012, 1.52, 25, -0.1, 0.00000170, 0.31, -0.711, 0, 0, 0]
    ];
    private static QI_KB: number[] = [
        1640650.479938, 15.21842500,
        1642476.703182, 15.21874996,
        1683430.515601, 15.218750011,
        1752157.640664, 15.218749978,
        1807675.003759, 15.218620279,
        1883627.765182, 15.218612292,
        1907369.128100, 15.218449176,
        1936603.140413, 15.218425000,
        1939145.524180, 15.218466998,
        1947180.798300, 15.218524844,
        1964362.041824, 15.218533526,
        1987372.340971, 15.218513908,
        1999653.819126, 15.218530782,
        2007445.469786, 15.218535181,
        2021324.917146, 15.218526248,
        2047257.232342, 15.218519654,
        2070282.898213, 15.218425000,
        2073204.872850, 15.218515221,
        2080144.500926, 15.218530782,
        2086703.688963, 15.218523776,
        2110033.182763, 15.218425000,
        2111190.300888, 15.218425000,
        2113731.271005, 15.218515671,
        2120670.840263, 15.218425000,
        2123973.309063, 15.218425000,
        2125068.997336, 15.218477932,
        2136026.312633, 15.218472436,
        2156099.495538, 15.218425000,
        2159021.324663, 15.218425000,
        2162308.575254, 15.218461742,
        2178485.706538, 15.218425000,
        2178759.662849, 15.218445786,
        2185334.020800, 15.218425000,
        2187525.481425, 15.218425000,
        2188621.191481, 15.218437494,
        2322147.76
    ];
    private static QB: string = ShouXingUtil.decode('FrcFs22AFsckF2tsDtFqEtF1posFdFgiFseFtmelpsEfhkF2anmelpFlF1ikrotcnEqEq2FfqmcDsrFor22FgFrcgDscFs22FgEeFtE2sfFs22sCoEsaF2tsD1FpeE2eFsssEciFsFnmelpFcFhkF2tcnEqEpFgkrotcnEqrEtFermcDsrE222FgBmcmr22DaEfnaF222sD1FpeForeF2tssEfiFpEoeFssD1iFstEqFppDgFstcnEqEpFg11FscnEqrAoAF2ClAEsDmDtCtBaDlAFbAEpAAAAAD2FgBiBqoBbnBaBoAAAAAAAEgDqAdBqAFrBaBoACdAAf1AACgAAAeBbCamDgEifAE2AABa1C1BgFdiAAACoCeE1ADiEifDaAEqAAFe1AcFbcAAAAAF1iFaAAACpACmFmAAAAAAAACrDaAAADG0');
    private static SHUO_KB: number[] = [1457698.231017, 29.53067166, 1546082.512234, 29.53085106, 1640640.735300, 29.53060000, 1642472.151543, 29.53085439, 1683430.509300, 29.53086148, 1752148.041079, 29.53085097, 1807665.420323, 29.53059851, 1883618.114100, 29.53060000, 1907360.704700, 29.53060000, 1936596.224900, 29.53060000, 1939135.675300, 29.53060000, 1947168.00];
    private static SB: string = ShouXingUtil.decode('EqoFscDcrFpmEsF2DfFideFelFpFfFfFiaipqti1ksttikptikqckstekqttgkqttgkqteksttikptikq2fjstgjqttjkqttgkqtekstfkptikq2tijstgjiFkirFsAeACoFsiDaDiADc1AFbBfgdfikijFifegF1FhaikgFag1E2btaieeibggiffdeigFfqDfaiBkF1kEaikhkigeidhhdiegcFfakF1ggkidbiaedksaFffckekidhhdhdikcikiakicjF1deedFhFccgicdekgiFbiaikcfi1kbFibefgEgFdcFkFeFkdcfkF1kfkcickEiFkDacFiEfbiaejcFfffkhkdgkaiei1ehigikhdFikfckF1dhhdikcfgjikhfjicjicgiehdikcikggcifgiejF1jkieFhegikggcikFegiegkfjebhigikggcikdgkaFkijcfkcikfkcifikiggkaeeigefkcdfcfkhkdgkegieidhijcFfakhfgeidieidiegikhfkfckfcjbdehdikggikgkfkicjicjF1dbidikFiggcifgiejkiegkigcdiegfggcikdbgfgefjF1kfegikggcikdgFkeeijcfkcikfkekcikdgkabhkFikaffcfkhkdgkegbiaekfkiakicjhfgqdq2fkiakgkfkhfkfcjiekgFebicggbedF1jikejbbbiakgbgkacgiejkijjgigfiakggfggcibFifjefjF1kfekdgjcibFeFkijcfkfhkfkeaieigekgbhkfikidfcjeaibgekgdkiffiffkiakF1jhbakgdki1dj1ikfkicjicjieeFkgdkicggkighdF1jfgkgfgbdkicggfggkidFkiekgijkeigfiskiggfaidheigF1jekijcikickiggkidhhdbgcfkFikikhkigeidieFikggikhkffaffijhidhhakgdkhkijF1kiakF1kfheakgdkifiggkigicjiejkieedikgdfcggkigieeiejfgkgkigbgikicggkiaideeijkefjeijikhkiggkiaidheigcikaikffikijgkiahi1hhdikgjfifaakekighie1hiaikggikhkffakicjhiahaikggikhkijF1kfejfeFhidikggiffiggkigicjiekgieeigikggiffiggkidheigkgfjkeigiegikifiggkidhedeijcfkFikikhkiggkidhh1ehigcikaffkhkiggkidhh1hhigikekfiFkFikcidhh1hitcikggikhkfkicjicghiediaikggikhkijbjfejfeFhaikggifikiggkigiejkikgkgieeigikggiffiggkigieeigekijcijikggifikiggkideedeijkefkfckikhkiggkidhh1ehijcikaffkhkiggkidhh1hhigikhkikFikfckcidhh1hiaikgjikhfjicjicgiehdikcikggifikigiejfejkieFhegikggifikiggfghigkfjeijkhigikggifikiggkigieeijcijcikfksikifikiggkidehdeijcfdckikhkiggkhghh1ehijikifffffkhsFngErD1pAfBoDd1BlEtFqA2AqoEpDqElAEsEeB2BmADlDkqBtC1FnEpDqnEmFsFsAFnllBbFmDsDiCtDmAB2BmtCgpEplCpAEiBiEoFqFtEqsDcCnFtADnFlEgdkEgmEtEsCtDmADqFtAFrAtEcCqAE1BoFqC1F1DrFtBmFtAC2ACnFaoCgADcADcCcFfoFtDlAFgmFqBq2bpEoAEmkqnEeCtAE1bAEqgDfFfCrgEcBrACfAAABqAAB1AAClEnFeCtCgAADqDoBmtAAACbFiAAADsEtBqAB2FsDqpFqEmFsCeDtFlCeDtoEpClEqAAFrAFoCgFmFsFqEnAEcCqFeCtFtEnAEeFtAAEkFnErAABbFkADnAAeCtFeAfBoAEpFtAABtFqAApDcCGJ');

    private static decode(s: string): string {
        const o: string = '0000000000';
        const o2: string = o + o;
        s = s.replace(/J/g, '00');
        s = s.replace(/I/g, '000');
        s = s.replace(/H/g, '0000');
        s = s.replace(/G/g, '00000');
        s = s.replace(/t/g, '02');
        s = s.replace(/s/g, '002');
        s = s.replace(/r/g, '0002');
        s = s.replace(/q/g, '00002');
        s = s.replace(/p/g, '000002');
        s = s.replace(/o/g, '0000002');
        s = s.replace(/n/g, '00000002');
        s = s.replace(/m/g, '000000002');
        s = s.replace(/l/g, '0000000002');
        s = s.replace(/k/g, '01');
        s = s.replace(/j/g, '0101');
        s = s.replace(/i/g, '001');
        s = s.replace(/h/g, '001001');
        s = s.replace(/g/g, '0001');
        s = s.replace(/f/g, '00001');
        s = s.replace(/e/g, '000001');
        s = s.replace(/d/g, '0000001');
        s = s.replace(/c/g, '00000001');
        s = s.replace(/b/g, '000000001');
        s = s.replace(/a/g, '0000000001');
        s = s.replace(/A/g, o2 + o2 + o2);
        s = s.replace(/B/g, o2 + o2 + o);
        s = s.replace(/C/g, o2 + o2);
        s = s.replace(/D/g, o2 + o);
        s = s.replace(/E/g, o2);
        s = s.replace(/F/g, o);
        return s;
    }

    static nutationLon2(t: number): number {
        let a: number = -1.742 * t, t2: number = t * t, dl: number = 0;
        for (let i: number = 0, j: number = ShouXingUtil.NUT_B.length; i < j; i += 5) {
            dl += (ShouXingUtil.NUT_B[i + 3] + a) * Math.sin(ShouXingUtil.NUT_B[i] + ShouXingUtil.NUT_B[i + 1] * t + ShouXingUtil.NUT_B[i + 2] * t2);
            a = 0;
        }
        return dl / 100 / ShouXingUtil.SECOND_PER_RAD;
    }

    static eLon(t: number, n: number): number {
        t /= 10;
        let v: number = 0, tn: number = 1;
        let n1, n2;
        let m;
        let c;
        let pn: number = 1;
        let n0, m0: number = ShouXingUtil.XL0[pn + 1] - ShouXingUtil.XL0[pn];
        for (let i: number = 0; i < 6; i++, tn *= t) {
            n1 = ~~(ShouXingUtil.XL0[pn + i]);
            n2 = ~~(ShouXingUtil.XL0[pn + 1 + i]);
            n0 = n2 - n1;
            if (n0 === 0) {
                continue;
            }
            if (n < 0) {
                m = n2;
            } else {
                m = ~~((3 * n * n0 / m0 + 0.5) + n1);
                if (i != 0) {
                    m += 3;
                }
                if (m > n2) {
                    m = n2;
                }
            }
            c = 0;
            for (let j: number = n1; j < m; j += 3) {
                c += ShouXingUtil.XL0[j] * Math.cos(ShouXingUtil.XL0[j + 1] + t * ShouXingUtil.XL0[j + 2]);
            }
            v += c * tn;
        }
        v /= ShouXingUtil.XL0[0];
        let t2: number = t * t;
        v += (-0.0728 - 2.7702 * t - 1.1019 * t2 - 0.0996 * t2 * t) / ShouXingUtil.SECOND_PER_RAD;
        return v;
    }

    static mLon(t: number, n: number): number {
        let ob: number[][] = ShouXingUtil.XL1;
        let obl: number = ob[0].length;
        let tn: number = 1;
        let v: number = 0;
        let j;
        let c;
        let t2: number = t * t,
            t3: number = t2 * t,
            t4: number = t3 * t,
            t5: number = t4 * t,
            tx: number = t - 10;
        v += (3.81034409 + 8399.684730072 * t - 3.319e-05 * t2 + 3.11e-08 * t3 - 2.033e-10 * t4) * ShouXingUtil.SECOND_PER_RAD;
        v += 5028.792262 * t + 1.1124406 * t2 + 0.00007699 * t3 - 0.000023479 * t4 - 0.0000000178 * t5;
        if (tx > 0) {
            v += -0.866 + 1.43 * tx + 0.054 * tx * tx;
        }
        t2 /= 1e4;
        t3 /= 1e8;
        t4 /= 1e8;

        n *= 6;
        if (n < 0) {
            n = obl;
        }
        for (let i: number = 0, x: number = ob.length; i < x; i++, tn *= t) {
            let f: number[] = ob[i];
            let l: number = f.length;
            let m: number = ~~((n * l / obl + 0.5));
            if (i > 0) {
                m += 6;
            }
            if (m >= l) {
                m = l;
            }
            for (j = 0, c = 0; j < m; j += 6) {
                c += f[j] * Math.cos(f[j + 1] + t * f[j + 2] + t2 * f[j + 3] + t3 * f[j + 4] + t4 * f[j + 5]);
            }
            v += c * tn;
        }
        v /= ShouXingUtil.SECOND_PER_RAD;
        return v;
    }

    static gxcSunLon(t: number): number {
        let t2: number = t * t;
        let v: number = -0.043126 + 628.301955 * t - 0.000002732 * t2;
        let e: number = 0.016708634 - 0.000042037 * t - 0.0000001267 * t2;
        return -20.49552 * (1 + e * Math.cos(v)) / ShouXingUtil.SECOND_PER_RAD;
    }

    static ev(t: number): number {
        let f: number = 628.307585 * t;
        return 628.332 + 21 * Math.sin(1.527 + f) + 0.44 * Math.sin(1.48 + f * 2) + 0.129 * Math.sin(5.82 + f) * t + 0.00055 * Math.sin(4.21 + f) * t * t;
    }

    static saLon(t: number, n: number): number {
        return ShouXingUtil.eLon(t, n) + ShouXingUtil.nutationLon2(t) + ShouXingUtil.gxcSunLon(t) + Math.PI;
    }

    static dtExt(y: number, jsd: number): number {
        let dy: number = (y - 1820) / 100;
        return -20 + jsd * dy * dy;
    }

    static dtCalc(y: number): number {
        const size: number = ShouXingUtil.DT_AT.length;
        let y0: number = ShouXingUtil.DT_AT[size - 2];
        let t0: number = ShouXingUtil.DT_AT[size - 1];
        if (y >= y0) {
            let jsd: number = 31;
            if (y > y0 + 100) {
                return ShouXingUtil.dtExt(y, jsd);
            }
            return ShouXingUtil.dtExt(y, jsd) - (ShouXingUtil.dtExt(y0, jsd) - t0) * (y0 + 100 - y) / 100;
        }
        let i;
        for (i = 0; i < size; i += 5) {
            if (y < ShouXingUtil.DT_AT[i + 5]) {
                break;
            }
        }
        let t1: number = (y - ShouXingUtil.DT_AT[i]) / (ShouXingUtil.DT_AT[i + 5] - ShouXingUtil.DT_AT[i]) * 10,
            t2 = t1 * t1,
            t3: number = t2 * t1;
        return ShouXingUtil.DT_AT[i + 1] + ShouXingUtil.DT_AT[i + 2] * t1 + ShouXingUtil.DT_AT[i + 3] * t2 + ShouXingUtil.DT_AT[i + 4] * t3;
    }

    static dtT(t: number): number {
        return ShouXingUtil.dtCalc(t / 365.2425 + 2000) / ShouXingUtil.SECOND_PER_DAY;
    }

    static mv(t: number): number {
        let v: number = 8399.71 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t);
        v -= 179 * Math.sin(2.543 + 15542.7543 * t) + 160 * Math.sin(0.1874 + 7214.0629 * t) + 62 * Math.sin(3.14 + 16657.3828 * t) + 34 * Math.sin(4.827 + 16866.9323 * t) + 22 * Math.sin(4.9 + 23871.4457 * t) + 12 * Math.sin(2.59 + 14914.4523 * t) + 7 * Math.sin(0.23 + 6585.7609 * t) + 5 * Math.sin(0.9 + 25195.624 * t) + 5 * Math.sin(2.32 - 7700.3895 * t) + 5 * Math.sin(3.88 + 8956.9934 * t) + 5 * Math.sin(0.49 + 7771.3771 * t);
        return v;
    }

    static saLonT(w: number): number {
        let t, v: number = 628.3319653318;
        t = (w - 1.75347 - Math.PI) / v;
        v = ShouXingUtil.ev(t);
        t += (w - ShouXingUtil.saLon(t, 10)) / v;
        v = ShouXingUtil.ev(t);
        t += (w - ShouXingUtil.saLon(t, -1)) / v;
        return t;
    }

    static msaLon(t: number, mn: number, sn: number): number {
        return ShouXingUtil.mLon(t, mn) + (-3.4E-6) - (ShouXingUtil.eLon(t, sn) + ShouXingUtil.gxcSunLon(t) + Math.PI);
    }

    static msaLonT(w: number): number {
        let t, v: number = 7771.37714500204;
        t = (w + 1.08472) / v;
        t += (w - ShouXingUtil.msaLon(t, 3, 3)) / v;
        v = ShouXingUtil.mv(t) - ShouXingUtil.ev(t);
        t += (w - ShouXingUtil.msaLon(t, 20, 10)) / v;
        t += (w - ShouXingUtil.msaLon(t, -1, 60)) / v;
        return t;
    }

    static saLonT2(w: number): number {
        const v: number = 628.3319653318;
        let t: number = (w - 1.75347 - Math.PI) / v;
        t -= (0.000005297 * t * t + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t) / v;
        t += (w - ShouXingUtil.eLon(t, 8) - Math.PI + (20.5 + 17.2 * Math.sin(2.1824 - 33.75705 * t)) / ShouXingUtil.SECOND_PER_RAD) / v;
        return t;
    }

    static msaLonT2(w: number): number {
        let t, v: number = 7771.37714500204;
        t = (w + 1.08472) / v;
        let l, t2: number = t * t;
        t -= (-0.00003309 * t2 + 0.10976 * Math.cos(0.784758 + 8328.6914246 * t + 0.000152292 * t2) + 0.02224 * Math.cos(0.18740 + 7214.0628654 * t - 0.00021848 * t2) - 0.03342 * Math.cos(4.669257 + 628.307585 * t)) / v;
        t2 = t * t;
        l = ShouXingUtil.mLon(t, 20) - (4.8950632 + 628.3319653318 * t + 0.000005297 * t2 + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t + 0.000349 * Math.cos(4.6261 + 1256.61517 * t) - 20.5 / ShouXingUtil.SECOND_PER_RAD);
        v = 7771.38 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t2) - 179 * Math.sin(2.543 + 15542.7543 * t) - 160 * Math.sin(0.1874 + 7214.0629 * t);
        t += (w - l) / v;
        return t;
    }

    static qiHigh(w: number): number {
        let t: number = ShouXingUtil.saLonT2(w) * 36525;
        t = t - ShouXingUtil.dtT(t) + ShouXingUtil.ONE_THIRD;
        const v: number = ((t + 0.5) % 1) * ShouXingUtil.SECOND_PER_DAY;
        if (v < 1200 || v > ShouXingUtil.SECOND_PER_DAY - 1200) {
            t = ShouXingUtil.saLonT(w) * 36525 - ShouXingUtil.dtT(t) + ShouXingUtil.ONE_THIRD;
        }
        return t;
    }

    static shuoHigh(w: number): number {
        let t: number = ShouXingUtil.msaLonT2(w) * 36525;
        t = t - ShouXingUtil.dtT(t) + ShouXingUtil.ONE_THIRD;
        let v: number = ((t + 0.5) % 1) * ShouXingUtil.SECOND_PER_DAY;
        if (v < 1800 || v > ShouXingUtil.SECOND_PER_DAY - 1800) {
            t = ShouXingUtil.msaLonT(w) * 36525 - ShouXingUtil.dtT(t) + ShouXingUtil.ONE_THIRD;
        }
        return t;
    }

    static qiLow(w: number): number {
        const v: number = 628.3319653318;
        let t: number = (w - 4.895062166) / v;
        t -= (53 * t * t + 334116 * Math.cos(4.67 + 628.307585 * t) + 2061 * Math.cos(2.678 + 628.3076 * t) * t) / v / 10000000;
        const n: number = 48950621.66 + 6283319653.318 * t + 53 * t * t + 334166 * Math.cos(4.669257 + 628.307585 * t) + 3489 * Math.cos(4.6261 + 1256.61517 * t) + 2060.6 * Math.cos(2.67823 + 628.307585 * t) * t - 994 - 834 * Math.sin(2.1824 - 33.75705 * t);
        t -= (n / 10000000 - w) / 628.332 + (32 * (t + 1.8) * (t + 1.8) - 20) / ShouXingUtil.SECOND_PER_DAY / 36525;
        return t * 36525 + ShouXingUtil.ONE_THIRD;
    }

    static shuoLow(w: number): number {
        let v: number = 7771.37714500204;
        let t: number = (w + 1.08472) / v;
        t -= (-0.0000331 * t * t + 0.10976 * Math.cos(0.785 + 8328.6914 * t) + 0.02224 * Math.cos(0.187 + 7214.0629 * t) - 0.03342 * Math.cos(4.669 + 628.3076 * t)) / v + (32 * (t + 1.8) * (t + 1.8) - 20) / ShouXingUtil.SECOND_PER_DAY / 36525;
        return t * 36525 + ShouXingUtil.ONE_THIRD;
    }

    static calcShuo(jd: number): number {
        let size: number = ShouXingUtil.SHUO_KB.length;
        let d: number = 0;
        let pc: number = 14, i;
        jd += 2451545;
        let f1: number = ShouXingUtil.SHUO_KB[0] - pc, f2 = ShouXingUtil.SHUO_KB[size - 1] - pc, f3 = 2436935;
        if (jd < f1 || jd >= f3) {
            d = Math.floor(ShouXingUtil.shuoHigh(Math.floor((jd + pc - 2451551) / 29.5306) * ShouXingUtil.PI_2) + 0.5);
        } else if (jd >= f1 && jd < f2) {
            for (i = 0; i < size; i += 2) {
                if (jd + pc < ShouXingUtil.SHUO_KB[i + 2]) {
                    break;
                }
            }
            d = ShouXingUtil.SHUO_KB[i] + ShouXingUtil.SHUO_KB[i + 1] * Math.floor((jd + pc - ShouXingUtil.SHUO_KB[i]) / ShouXingUtil.SHUO_KB[i + 1]);
            d = Math.floor(d + 0.5);
            if (d === 1683460) {
                d++;
            }
            d -= 2451545;
        } else if (jd >= f2 && jd < f3) {
            d = Math.floor(ShouXingUtil.shuoLow(Math.floor((jd + pc - 2451551) / 29.5306) * ShouXingUtil.PI_2) + 0.5);
            let from: number = Math.floor((jd - f2) / 29.5306);
            let n: string = ShouXingUtil.SB.substring(from, from + 1);
            if ('1' === n) {
                d += 1;
            } else if ('2' === n) {
                d -= 1;
            }
        }
        return d;
    }

    static calcQi(jd: number): number {
        let size: number = ShouXingUtil.QI_KB.length;
        let d: number = 0;
        let pc: number = 7, i;
        jd += 2451545;
        let f1: number = ShouXingUtil.QI_KB[0] - pc, f2 = ShouXingUtil.QI_KB[size - 1] - pc, f3 = 2436935;
        if (jd < f1 || jd >= f3) {
            d = Math.floor(ShouXingUtil.qiHigh(Math.floor((jd + pc - 2451259) / 365.2422 * 24) * Math.PI / 12) + 0.5);
        } else if (jd >= f1 && jd < f2) {
            for (i = 0; i < size; i += 2) {
                if (jd + pc < ShouXingUtil.QI_KB[i + 2]) {
                    break;
                }
            }
            d = ShouXingUtil.QI_KB[i] + ShouXingUtil.QI_KB[i + 1] * Math.floor((jd + pc - ShouXingUtil.QI_KB[i]) / ShouXingUtil.QI_KB[i + 1]);
            d = Math.floor(d + 0.5);
            if (d === 1683460) {
                d++;
            }
            d -= 2451545;
        } else if (jd >= f2 && jd < f3) {
            d = Math.floor(ShouXingUtil.qiLow(Math.floor((jd + pc - 2451259) / 365.2422 * 24) * Math.PI / 12) + 0.5);
            let from: number = Math.floor((jd - f2) / 365.2422 * 24);
            let n: string = ShouXingUtil.QB.substring(from, from + 1);
            if ('1' === n) {
                d += 1;
            } else if ('2' === n) {
                d -= 1;
            }
        }
        return d;
    }

    static qiAccurate(w: number): number {
        const t: number = ShouXingUtil.saLonT(w) * 36525;
        return t - ShouXingUtil.dtT(t) + ShouXingUtil.ONE_THIRD;
    }

    static qiAccurate2(jd: number): number {
        const d: number = Math.PI / 12;
        const w: number = Math.floor((jd + 293) / 365.2422 * 24) * d;
        const a: number = ShouXingUtil.qiAccurate(w);
        if (a - jd > 5) {
            return ShouXingUtil.qiAccurate(w - d);
        }
        if (a - jd < -5) {
            return ShouXingUtil.qiAccurate(w + d);
        }
        return a;
    }

}

export class SolarTerm extends LoopTyme {
    static NAMES: string[] = ['冬至', '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪'];

    protected cursoryJulianDay: number;

    protected constructor(year: number, indexOrName: number | string, cursoryJulianDay?: number) {
        super(SolarTerm.NAMES, indexOrName);
        if (cursoryJulianDay) {
            this.cursoryJulianDay = cursoryJulianDay;
        } else {
            this.cursoryJulianDay = 0;
            this.initByYear(year, typeof indexOrName === 'number' ? indexOrName : this.index);
        }
    }

    protected initByYear(year: number, offset: number) {
        const jd: number = Math.floor((year - 2000) * 365.2422 + 180);
        // 355是2000.12冬至，得到较靠近jd的冬至估计值
        let w: number = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355;
        if (ShouXingUtil.calcQi(w) > jd) {
            w -= 365.2422;
        }
        this.cursoryJulianDay = ShouXingUtil.calcQi(w + 15.2184 * offset);
    }

    static fromIndex(year: number, index: number): SolarTerm {
        return new SolarTerm(year, index);
    }

    static fromName(year: number, name: string): SolarTerm {
        return new SolarTerm(year, name);
    }

    next(n: number): SolarTerm {
        return new SolarTerm(0, this.nextIndex(n), this.cursoryJulianDay + 15.2184 * n);
    }

    isJie(): boolean {
        return this.index % 2 === 1;
    }

    isQi(): boolean {
        return this.index % 2 === 0;
    }

    getJulianDay(): JulianDay {
        return JulianDay.fromJulianDay(ShouXingUtil.qiAccurate2(this.cursoryJulianDay) + JulianDay.J2000);
    }

    getCursoryJulianDay(): number {
        return this.cursoryJulianDay;
    }
}

export class SolarYear extends AbstractTyme {
    protected year: number;

    protected constructor(year: number) {
        super();
        if (year < 1 || year > 9999) {
            throw new Error(`illegal solar year: ${year}`);
        }
        this.year = year;
    }

    static fromYear(year: number): SolarYear {
        return new SolarYear(year);
    }

    getYear(): number {
        return this.year;
    }

    getDayCount(): number {
        if (1582 === this.year) {
            return 355;
        }
        return this.isLeap() ? 366 : 365;
    }

    isLeap(): boolean {
        if (this.year < 1600) {
            return this.year % 4 === 0;
        }
        return (this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0);
    }

    getName(): string {
        return `${this.year}年`
    }

    next(n: number): SolarYear {
        return SolarYear.fromYear(this.year + n);
    }

    getMonths(): SolarMonth[] {
        const l: SolarMonth[] = [];
        for (let i: number = 0; i < 12; i++) {
            l.push(SolarMonth.fromYm(this.year, i + 1));
        }
        return l;
    }

    getSeasons(): SolarSeason[] {
        const l: SolarSeason[] = [];
        for (let i: number = 0; i < 4; i++) {
            l.push(SolarSeason.fromIndex(this.year, i));
        }
        return l;
    }

    getHalfYears(): SolarHalfYear[] {
        const l: SolarHalfYear[] = [];
        for (let i: number = 0; i < 2; i++) {
            l.push(SolarHalfYear.fromIndex(this.year, i));
        }
        return l;
    }
}

export class SolarHalfYear extends AbstractTyme {
    static NAMES: string[] = ['上半年', '下半年'];
    protected year: SolarYear;
    protected index: number;

    protected constructor(year: number, index: number) {
        super();
        this.year = SolarYear.fromYear(year);
        if (index < 0 || index > 1) {
            throw new Error(`illegal solar half year index: ${index}`);
        }
        this.index = index;
    }

    static fromIndex(year: number, index: number): SolarHalfYear {
        return new SolarHalfYear(year, index);
    }

    getYear(): SolarYear {
        return this.year;
    }

    getIndex(): number {
        return this.index;
    }

    getName(): string {
        return SolarHalfYear.NAMES[this.index];
    }

    toString(): string {
        return this.year.toString() + this.getName();
    }

    next(n: number): SolarHalfYear {
        const m: number = this.index + n;
        return SolarHalfYear.fromIndex(this.year.getYear() + ~~(m / 2), Math.abs(m % 2));
    }

    getMonths(): SolarMonth[] {
        const l: SolarMonth[] = [];
        const y: number = this.year.getYear();
        for (let i: number = 0; i < 6; i++) {
            l.push(SolarMonth.fromYm(y, this.index * 6 + i + 1));
        }
        return l;
    }

    getSeasons(): SolarSeason[] {
        const l: SolarSeason[] = [];
        const y: number = this.year.getYear();
        for (let i: number = 0; i < 2; i++) {
            l.push(SolarSeason.fromIndex(y, this.index * 2 + i));
        }
        return l;
    }
}

export class SolarSeason extends AbstractTyme {
    static NAMES: string[] = ['一季度', '二季度', '三季度', '四季度'];
    protected year: SolarYear;
    protected index: number;

    protected constructor(year: number, index: number) {
        super();
        this.year = SolarYear.fromYear(year);
        if (index < 0 || index > 3) {
            throw new Error(`illegal solar season index: ${index}`);
        }
        this.index = index;
    }

    static fromIndex(year: number, index: number): SolarSeason {
        return new SolarSeason(year, index);
    }

    getYear(): SolarYear {
        return this.year;
    }

    getIndex(): number {
        return this.index;
    }

    getName(): string {
        return SolarSeason.NAMES[this.index];
    }

    toString(): string {
        return this.year.toString() + this.getName();
    }

    next(n: number): SolarSeason {
        const m: number = this.index + n;
        return SolarSeason.fromIndex(this.year.getYear() + ~~(m / 4), Math.abs(m % 4));
    }

    getMonths(): SolarMonth[] {
        const l: SolarMonth[] = [];
        const y: number = this.year.getYear();
        for (let i: number = 0; i < 3; i++) {
            l.push(SolarMonth.fromYm(y, this.index * 3 + i + 1));
        }
        return l;
    }
}

export class SolarMonth extends AbstractTyme {
    static NAMES: string[] = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    static DAYS: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    protected year: SolarYear;
    protected month: number;

    protected constructor(year: number, month: number) {
        super();
        this.year = SolarYear.fromYear(year);
        if (month < 1 || month > 12) {
            throw new Error(`illegal solar month: ${month}`);
        }
        this.month = month;
    }

    static fromYm(year: number, month: number): SolarMonth {
        return new SolarMonth(year, month);
    }

    getYear(): SolarYear {
        return this.year;
    }

    getMonth(): number {
        return this.month;
    }

    getDayCount(): number {
        if (1582 === this.year.getYear() && 10 === this.month) {
            return 21;
        }
        let d: number = SolarMonth.DAYS[this.getIndexInYear()];
        //公历闰年2月多一天
        if (2 === this.month && this.year.isLeap()) {
            d++;
        }
        return d;
    }

    getIndexInYear(): number {
        return this.month - 1;
    }

    getSeason(): SolarSeason {
        return SolarSeason.fromIndex(this.year.getYear(), ~~(this.getIndexInYear() / 3));
    }

    getWeekCount(start: number): number {
        return Math.ceil((this.indexOf(SolarDay.fromYmd(this.year.getYear(), this.month, 1).getWeek().getIndex() - start, 7) + this.getDayCount()) / 7);
    }

    getName(): string {
        return SolarMonth.NAMES[this.getIndexInYear()];
    }

    toString(): string {
        return this.year.toString() + this.getName();
    }

    next(n: number): SolarMonth {
        if (n == 0) {
            return SolarMonth.fromYm(this.year.getYear(), this.month);
        }
        let m: number = this.month + n;
        let y: number = this.year.getYear() + ~~(m / 12);
        m %= 12;
        if (m < 1) {
            m += 12;
            y--;
        }
        return SolarMonth.fromYm(y, m);
    }

    getWeeks(start: number): SolarWeek[] {
        const l: SolarWeek[] = [];
        const y: number = this.year.getYear();
        for (let i: number = 0; i < this.getWeekCount(start); i++) {
            l.push(SolarWeek.fromYm(y, this.month, i, start));
        }
        return l;
    }

    getDays(): SolarDay[] {
        const l: SolarDay[] = [];
        const y: number = this.year.getYear();
        for (let i: number = 0; i < this.getDayCount(); i++) {
            l.push(SolarDay.fromYmd(y, this.month, i + 1));
        }
        return l;
    }
}

export class SolarWeek extends AbstractTyme {
    static NAMES: string[] = ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周'];
    protected month: SolarMonth;
    protected index: number;
    protected start: Week;

    protected constructor(year: number, month: number, index: number, start: number) {
        super();
        if (index < 0 || index > 5) {
            throw new Error(`illegal solar week index: ${index}`);
        }
        if (start < 0 || start > 6) {
            throw new Error(`illegal solar week start: ${start}`);
        }
        const m: SolarMonth = SolarMonth.fromYm(year, month)
        if (index >= m.getWeekCount(start)) {
            throw new Error(`illegal solar week index: ${index} in month: ${m.toString()}`);
        }
        this.month = m;
        this.index = index;
        this.start = Week.fromIndex(start);
    }

    static fromYm(year: number, month: number, index: number, start: number): SolarWeek {
        return new SolarWeek(year, month, index, start);
    }

    getMonth(): SolarMonth {
        return this.month;
    }

    getIndex(): number {
        return this.index;
    }

    getStart(): Week {
        return this.start;
    }

    getName(): string {
        return SolarWeek.NAMES[this.index];
    }

    toString(): string {
        return this.month.toString() + this.getName();
    }

    next(n: number): SolarWeek {
        const startIndex: number = this.start.getIndex();
        if (n === 0) {
            return SolarWeek.fromYm(this.month.getYear().getYear(), this.month.getMonth(), this.index, startIndex);
        }
        let d: number = this.index + n;
        let m: SolarMonth = this.month;
        let weeksInMonth: number = m.getWeekCount(startIndex);
        const forward: boolean = n > 0;
        const add: number = forward ? 1 : -1;
        while (forward ? (d >= weeksInMonth) : (d < 0)) {
            if (forward) {
                d -= weeksInMonth;
            }
            if (!forward) {
                if (!SolarDay.fromYmd(m.getYear().getYear(), m.getMonth(), 1).getWeek().equals(this.start)) {
                    d += add;
                }
            }
            m = m.next(add);
            if (forward) {
                if (!SolarDay.fromYmd(m.getYear().getYear(), m.getMonth(), 1).getWeek().equals(this.start)) {
                    d += add;
                }
            }
            weeksInMonth = m.getWeekCount(startIndex);
            if (!forward) {
                d += weeksInMonth;
            }
        }
        return SolarWeek.fromYm(m.getYear().getYear(), m.getMonth(), d, startIndex);
    }

    getFirstDay(): SolarDay {
        const m: SolarMonth = this.getMonth();
        const firstDay: SolarDay = SolarDay.fromYmd(m.getYear().getYear(), m.getMonth(), 1);
        return firstDay.next(this.index * 7 - this.indexOf(firstDay.getWeek().getIndex() - this.start.getIndex(), 7));
    }

    getDays(): SolarDay[] {
        const l: SolarDay[] = [];
        const d: SolarDay = this.getFirstDay();
        l.push(d);
        for (let i: number = 1; i < 7; i++) {
            l.push(d.next(i));
        }
        return l;
    }
}

export class SolarDay extends AbstractTyme {
    static NAMES: string[] = ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'];
    protected month: SolarMonth;
    protected day: number;

    protected constructor(year: number, month: number, day: number) {
        super();
        this.month = SolarMonth.fromYm(year, month);
        if (day < 1) {
            throw new Error(`illegal solar day: ${year}-${month}-${day}`);
        }
        if (1582 === year && 10 === month) {
            if (day > 4 && day < 15) {
                throw new Error(`illegal solar day: ${year}-${month}-${day}`);
            } else if (day > 31) {
                throw new Error(`illegal solar day: ${year}-${month}-${day}`);
            }
        } else if (day > SolarMonth.fromYm(year, month).getDayCount()) {
            throw new Error(`illegal solar day: ${year}-${month}-${day}`);
        }
        this.day = day;
    }

    static fromYmd(year: number, month: number, day: number): SolarDay {
        return new SolarDay(year, month, day);
    }

    getMonth(): SolarMonth {
        return this.month;
    }

    getDay(): number {
        return this.day;
    }

    getWeek(): Week {
        return this.getJulianDay().getWeek();
    }

    getConstellation(): Constellation {
        let index: number = 11;
        const y: number = this.month.getMonth() * 100 + this.day;
        if (y >= 321 && y <= 419) {
            index = 0;
        } else if (y >= 420 && y <= 520) {
            index = 1;
        } else if (y >= 521 && y <= 621) {
            index = 2;
        } else if (y >= 622 && y <= 722) {
            index = 3;
        } else if (y >= 723 && y <= 822) {
            index = 4;
        } else if (y >= 823 && y <= 922) {
            index = 5;
        } else if (y >= 923 && y <= 1023) {
            index = 6;
        } else if (y >= 1024 && y <= 1122) {
            index = 7;
        } else if (y >= 1123 && y <= 1221) {
            index = 8;
        } else if (y >= 1222 || y <= 119) {
            index = 9;
        } else if (y <= 218) {
            index = 10;
        }
        return Constellation.fromIndex(index);
    }

    getName(): string {
        return SolarDay.NAMES[this.day - 1];
    }

    toString(): string {
        return this.month.toString() + this.getName();
    }

    next(n: number): SolarDay {
        return this.getJulianDay().next(n).getSolarDay();
    }

    isBefore(target: SolarDay): boolean {
        const aYear: number = this.month.getYear().getYear();
        const targetMonth: SolarMonth = target.getMonth();
        const bYear: number = targetMonth.getYear().getYear();
        if (aYear === bYear) {
            const aMonth: number = this.month.getMonth();
            const bMonth: number = targetMonth.getMonth();
            return aMonth === bMonth ? this.day < target.getDay() : aMonth < bMonth;
        }
        return aYear < bYear;
    }

    isAfter(target: SolarDay): boolean {
        const aYear: number = this.month.getYear().getYear();
        const targetMonth: SolarMonth = target.getMonth();
        const bYear: number = targetMonth.getYear().getYear();
        if (aYear === bYear) {
            const aMonth: number = this.month.getMonth();
            const bMonth: number = targetMonth.getMonth();
            return aMonth === bMonth ? this.day > target.getDay() : aMonth > bMonth;
        }
        return aYear > bYear;
    }

    getTerm(): SolarTerm {
        let term: SolarTerm = SolarTerm.fromIndex(this.month.getYear().getYear() + 1, 0);
        while (this.isBefore(term.getJulianDay().getSolarDay())) {
            term = term.next(-1);
        }
        return term;
    }

    getPhenologyDay(): PhenologyDay {
        const term: SolarTerm = this.getTerm();
        let dayIndex: number = this.subtract(term.getJulianDay().getSolarDay());
        let index: number = ~~(dayIndex / 5);
        if (index > 2) {
            index = 2;
        }
        dayIndex -= index * 5;
        return new PhenologyDay(Phenology.fromIndex(term.getIndex() * 3 + index), dayIndex);
    }

    getDogDay(): DogDay | null {
        const xiaZhi: SolarTerm = SolarTerm.fromIndex(this.month.getYear().getYear(), 12);
        // 第1个庚日
        let start: SolarDay = xiaZhi.getJulianDay().getSolarDay();
        let add: number = 6 - start.getLunarDay().getSixtyCycle().getHeavenStem().getIndex();
        if (add < 0) {
            add += 10;
        }
        // 第3个庚日，即初伏第1天
        add += 20;
        start = start.next(add);
        let days: number = this.subtract(start);
        // 初伏以前
        if (days < 0) {
            return null;
        }
        if (days < 10) {
            return new DogDay(Dog.fromIndex(0), days);
        }
        // 第4个庚日，中伏第1天
        start = start.next(10);
        days = this.subtract(start);
        if (days < 10) {
            return new DogDay(Dog.fromIndex(1), days);
        }
        // 第5个庚日，中伏第11天或末伏第1天
        start = start.next(10);
        days = this.subtract(start);
        // 立秋
        if (xiaZhi.next(3).getJulianDay().getSolarDay().isAfter(start)) {
            if (days < 10) {
                return new DogDay(Dog.fromIndex(1), days + 10);
            }
            start = start.next(10);
            days = this.subtract(start);
        }
        if (days < 10) {
            return new DogDay(Dog.fromIndex(2), days);
        }
        return null;
    }

    getNineDay(): NineDay | null {
        const year: number = this.month.getYear().getYear();
        let start: SolarDay = SolarTerm.fromIndex(year + 1, 0).getJulianDay().getSolarDay();
        if (this.isBefore(start)) {
            start = SolarTerm.fromIndex(year, 0).getJulianDay().getSolarDay();
        }
        const end: SolarDay = start.next(81);
        if (this.isBefore(start) || !this.isBefore(end)) {
            return null;
        }
        const days: number = this.subtract(start);
        return new NineDay(Nine.fromIndex(~~(days / 9)), days % 9);
    }

    getIndexInYear(): number {
        const m: number = this.month.getMonth();
        const y: number = this.month.getYear().getYear();
        let days: number = 0;
        for (let i: number = 1; i < m; i++) {
            days += SolarMonth.fromYm(y, i).getDayCount();
        }
        let d: number = this.day;
        if (1582 === y && 10 === m) {
            if (d >= 15) {
                d -= 10;
            }
        }
        return days + d - 1;
    }

    subtract(target: SolarDay): number {
        return ~~(this.getJulianDay().getDay() - target.getJulianDay().getDay());
    }

    getJulianDay(): JulianDay {
        return JulianDay.fromYmdHms(this.month.getYear().getYear(), this.month.getMonth(), this.day, 0, 0, 0);
    }

    getLunarDay(): LunarDay {
        let m: LunarMonth = LunarMonth.fromYm(this.month.getYear().getYear(), this.month.getMonth()).next(-3);
        let days: number = this.subtract(m.getFirstJulianDay().getSolarDay());
        while (days >= m.getDayCount()) {
            m = m.next(1);
            days = this.subtract(m.getFirstJulianDay().getSolarDay());
        }
        return LunarDay.fromYmd(m.getYear().getYear(), m.getMonthWithLeap(), days + 1);
    }

    getLegalHoliday(): LegalHoliday | null {
        const m: SolarMonth = this.getMonth();
        return LegalHoliday.fromYmd(m.getYear().getYear(), m.getMonth(), this.day);
    }

    getFestival(): SolarFestival | null {
        const m: SolarMonth = this.getMonth();
        return SolarFestival.fromYmd(m.getYear().getYear(), m.getMonth(), this.day);
    }
}

export class SolarTime extends AbstractTyme {
    protected day: SolarDay;
    protected hour: number;
    protected minute: number;
    protected second: number;

    protected constructor(year: number, month: number, day: number, hour: number, minute: number, second: number) {
        super();
        if (hour < 0 || hour > 23) {
            throw new Error(`illegal hour: ${hour}`);
        }
        if (minute < 0 || minute > 59) {
            throw new Error(`illegal minute: ${minute}`);
        }
        if (second < 0 || second > 59) {
            throw new Error(`illegal second: ${second}`);
        }
        this.day = SolarDay.fromYmd(year, month, day);
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): SolarTime {
        return new SolarTime(year, month, day, hour, minute, second);
    }

    getDay(): SolarDay {
        return this.day;
    }

    getHour(): number {
        return this.hour;
    }

    getMinute(): number {
        return this.minute;
    }

    getSecond(): number {
        return this.second;
    }

    getName(): string {
        const h: string = (this.hour < 10 ? '0' : '') + this.hour;
        const m: string = (this.minute < 10 ? '0' : '') + this.minute;
        const s: string = (this.second < 10 ? '0' : '') + this.second;
        return `${h}:${m}:${s}`;
    }

    toString(): string {
        return `${this.day.toString()} ${this.getName()}`;
    }

    next(n: number): SolarTime {
        const ts: number = this.second + n;
        const tm: number = this.minute + ~~(ts / 60);
        const th: number = this.hour + ~~(tm / 60);
        const d: SolarDay = this.day.next(~~(th / 24));
        const month: SolarMonth = d.getMonth();
        return SolarTime.fromYmdHms(month.getYear().getYear(), month.getMonth(), d.getDay(), th % 24, tm % 60, ts % 60);
    }

    isBefore(target: SolarTime): boolean {
        if (!this.day.equals(target.getDay())) {
            return this.day.isBefore(target.getDay());
        }
        const bHour: number = target.getHour();
        if (this.hour === bHour) {
            const bMinute: number = target.getMinute();
            return this.minute === bMinute ? this.second < target.getSecond() : this.minute < bMinute;
        }
        return this.hour < bHour;
    }

    isAfter(target: SolarTime): boolean {
        if (!this.day.equals(target.getDay())) {
            return this.day.isAfter(target.getDay());
        }
        const bHour: number = target.getHour();
        if (this.hour === bHour) {
            const bMinute: number = target.getMinute();
            return this.minute === bMinute ? this.second > target.getSecond() : this.minute > bMinute;
        }
        return this.hour > bHour;
    }

    getTerm(): SolarTerm {
        let term: SolarTerm = SolarTerm.fromIndex(this.day.getMonth().getYear().getYear() + 1, 0);
        while (this.isBefore(term.getJulianDay().getSolarTime())) {
            term = term.next(-1);
        }
        return term;
    }

    getJulianDay(): JulianDay {
        const month: SolarMonth = this.day.getMonth();
        return JulianDay.fromYmdHms(month.getYear().getYear(), month.getMonth(), this.day.getDay(), this.hour, this.minute, this.second);
    }

    subtract(target: SolarTime): number {
        let days: number = this.day.subtract(target.getDay());
        const cs: number = this.hour * 3600 + this.minute * 60 + this.second;
        const ts: number = target.getHour() * 3600 + target.getMinute() * 60 + target.getSecond();
        let seconds: number = cs - ts;
        if (seconds < 0) {
            seconds += 86400;
            days--;
        }
        seconds += days * 86400;
        return seconds;
    }

    getLunarHour(): LunarHour {
        const d: LunarDay = this.day.getLunarDay();
        const m: LunarMonth = d.getMonth();
        return LunarHour.fromYmdHms(m.getYear().getYear(), m.getMonthWithLeap(), d.getDay(), this.hour, this.minute, this.second);
    }

}

export class LegalHoliday extends AbstractTyme {
    static NAMES: string[] = ['元旦节', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节', '国庆中秋', '抗战胜利日'];
    static DATA: string = '2001122900+032001123000+022002010110+002002010210-012002010310-022002020901+032002021001+022002021211+002002021311-012002021411-022002021511-032002021611-042002021711-052002021811-062002042703+042002042803+032002050113+002002050213-012002050313-022002050413-032002050513-042002050613-052002050713-062002092806+032002092906+022002100116+002002100216-012002100316-022002100416-032002100516-042002100616-052002100716-062003010110+002003020111+002003020211-012003020311-022003020411-032003020511-042003020611-052003020711-062003020801-072003020901-082003042603+052003042703+042003050113+002003050213-012003050313-022003050413-032003050513-042003050613-052003050713-062003092706+042003092806+032003100116+002003100216-012003100316-022003100416-032003100516-042003100616-052003100716-062004010110+002004011701+052004011801+042004012211+002004012311-012004012411-022004012511-032004012611-042004012711-052004012811-062004050113+002004050213-012004050313-022004050413-032004050513-042004050613-052004050713-062004050803-072004050903-082004100116+002004100216-012004100316-022004100416-032004100516-042004100616-052004100716-062004100906-082004101006-092005010110+002005010210-012005010310-022005020501+042005020601+032005020911+002005021011-012005021111-022005021211-032005021311-042005021411-052005021511-062005043003+012005050113+002005050213-012005050313-022005050413-032005050513-042005050613-052005050713-062005050803-072005100116+002005100216-012005100316-022005100416-032005100516-042005100616-052005100716-062005100806-072005100906-082005123100+012006010110+002006010210-012006010310-022006012801+012006012911+002006013011-012006013111-022006020111-032006020211-042006020311-052006020411-062006020501-072006042903+022006043003+012006050113+002006050213-012006050313-022006050413-032006050513-042006050613-052006050713-062006093006+012006100116+002006100216-012006100316-022006100416-032006100516-042006100616-052006100716-062006100806-072006123000+022006123100+012007010110+002007010210-012007010310-022007021701+012007021811+002007021911-012007022011-022007022111-032007022211-042007022311-052007022411-062007022501-072007042803+032007042903+022007050113+002007050213-012007050313-022007050413-032007050513-042007050613-052007050713-062007092906+022007093006+012007100116+002007100216-012007100316-022007100416-032007100516-042007100616-052007100716-062007122900+032007123010+022007123110+012008010110+002008020201+042008020301+032008020611+002008020711-012008020811-022008020911-032008021011-042008021111-052008021211-062008040412+002008040512-012008040612-022008050113+002008050213-012008050313-022008050403-032008060714+012008060814+002008060914-012008091315+012008091415+002008091515-012008092706+042008092806+032008092916+022008093016+012008100116+002008100216-012008100316-022008100416-032008100516-042009010110+002009010210-012009010310-022009010400-032009012401+012009012511+002009012611-012009012711-022009012811-032009012911-042009013011-052009013111-062009020101-072009040412+002009040512-012009040612-022009050113+002009050213-012009050313-022009052814+002009052914-012009053014-022009053104-032009092706+042009100116+002009100216-012009100316-022009100416-032009100515-022009100615-032009100715-042009100815-052009101005-072010010110+002010010210-012010010310-022010021311+002010021411-012010021511-022010021611-032010021711-042010021811-052010021911-062010022001-072010022101-082010040312+022010040412+012010040512+002010050113+002010050213-012010050313-022010061204+042010061304+032010061414+022010061514+012010061614+002010091905+032010092215+002010092315-012010092415-022010092505-032010092606+052010100116+002010100216-012010100316-022010100416-032010100516-042010100616-052010100716-062010100906-082011010110+002011010210-012011010310-022011013001+042011020211+012011020311+002011020411-012011020511-022011020611-032011020711-042011020811-052011021201-092011040202+032011040312+022011040412+012011040512+002011043013+012011050113+002011050213-012011060414+022011060514+012011060614+002011091015+022011091115+012011091215+002011100116+002011100216-012011100316-022011100416-032011100516-042011100616-052011100716-062011100806-072011100906-082011123100+012012010110+002012010210-012012010310-022012012101+022012012211+012012012311+002012012411-012012012511-022012012611-032012012711-042012012811-052012012901-062012033102+042012040102+032012040212+022012040312+012012040412+002012042803+032012042913+022012043013+012012050113+002012050203-012012062214+012012062314+002012062414-012012092905+012012093015+002012100116+002012100216-012012100316-022012100416-032012100516-042012100616-052012100716-062012100806-072013010110+002013010210-012013010310-022013010500-042013010600-052013020911+012013021011+002013021111-012013021211-022013021311-032013021411-042013021511-052013021601-062013021701-072013040412+002013040512-012013040612-022013042703+042013042803+032013042913+022013043013+012013050113+002013060804+042013060904+032013061014+022013061114+012013061214+002013091915+002013092015-012013092115-022013092205-032013092906+022013100116+002013100216-012013100316-022013100416-032013100516-042013100616-052013100716-062014010110+002014012601+052014013111+002014020111-012014020211-022014020311-032014020411-042014020511-052014020611-062014020801-082014040512+002014040612-012014040712-022014050113+002014050213-012014050313-022014050403-032014053114+022014060114+012014060214+002014090615+022014090715+012014090815+002014092806+032014100116+002014100216-012014100316-022014100416+002014100516-042014100616-052014100716-062014101106-102015010110+002015010210-012015010310-022015010400-032015021501+042015021811+012015021911+002015022011-012015022111-022015022211-032015022311-042015022411-052015022801-092015040412+012015040512+002015040612-012015050113+002015050213-012015050313-022015062014+002015062114-012015062214-022015090318+002015090418-012015090518-022015090608-032015092615+012015092715+002015100116+002015100216-012015100316-022015100416+002015100516-042015100616-052015100716-062015101006-092016010110+002016010210-012016010310-022016020601+022016020711+012016020811+002016020911-012016021011-022016021111-032016021211-042016021311-052016021401-062016040212+022016040312+012016040412+002016043013+012016050113+002016050213-012016060914+002016061014-012016061114-022016061204-032016091515+002016091615-012016091715-022016091805-032016100116+002016100216-012016100316-022016100416-032016100516-042016100616-052016100716-062016100806-072016100906-082016123110+012017010110+002017010210-012017012201+062017012711+012017012811+002017012911-012017013011-022017013111-032017020111-042017020211-052017020401-072017040102+032017040212+022017040312+012017040412+002017042913+022017043013+012017050113+002017052704+032017052814+022017052914+012017053014+002017093006+012017100116+002017100216-012017100316-022017100415+002017100516-042017100616-052017100716-062017100816-072017123010+022017123110+012018010110+002018021101+052018021511+012018021611+002018021711-012018021811-022018021911-032018022011-042018022111-052018022401-082018040512+002018040612-012018040712-022018040802-032018042803+032018042913+022018043013+012018050113+002018061614+022018061714+012018061814+002018092215+022018092315+012018092415+002018092906+022018093006+012018100116+002018100216-012018100316-022018100416-032018100516-042018100616-052018100716-062018122900+032018123010+022018123110+012019010110+002019020201+032019020301+022019020411+012019020511+002019020611-012019020711-022019020811-032019020911-042019021011-052019040512+002019040612-012019040712-022019042803+032019050113+002019050213-012019050313-022019050413-032019050503-042019060714+002019060814-012019060914-022019091315+002019091415-012019091515-022019092906+022019100116+002019100216-012019100316-022019100416-032019100516-042019100616-052019100716-062019101206-112020010110+002020011901+062020012411+012020012511+002020012611-012020012711-022020012811-032020012911-042020013011-052020013111-062020020111-072020020211-082020040412+002020040512-012020040612-022020042603+052020050113+002020050213-012020050313-022020050413-032020050513-042020050903-082020062514+002020062614-012020062714-022020062804-032020092707+042020100117+002020100216-012020100316-022020100416-032020100516-042020100616-052020100716-062020100816-072020101006-092021010110+002021010210-012021010310-022021020701+052021021111+012021021211+002021021311-012021021411-022021021511-032021021611-042021021711-052021022001-082021040312+012021040412+002021040512-012021042503+062021050113+002021050213-012021050313-022021050413-032021050513-042021050803-072021061214+022021061314+012021061414+002021091805+032021091915+022021092015+012021092115+002021092606+052021100116+002021100216-012021100316-022021100416-032021100516-042021100616-052021100716-062021100906-082022010110+002022010210-012022010310-022022012901+032022013001+022022013111+012022020111+002022020211-012022020311-022022020411-032022020511-042022020611-052022040202+032022040312+022022040412+012022040512+002022042403+072022043013+012022050113+002022050213-012022050313-022022050413-032022050703-062022060314+002022060414-012022060514-022022091015+002022091115-012022091215-022022100116+002022100216-012022100316-022022100416-032022100516-042022100616-052022100716-062022100806-072022100906-082022123110+012023010110+002023010210-012023012111+012023012211+002023012311-012023012411-022023012511-032023012611-042023012711-052023012801-062023012901-072023040512+002023042303+082023042913+022023043013+012023050113+002023050213-012023050313-022023050603-052023062214+002023062314-012023062414-022023062504-032023092915+002023093016+012023100116+002023100216-012023100316-022023100416-032023100516-042023100616-052023100706-062023100806-072023123010+022023123110+012024010110+002024020401+062024021011+002024021111-012024021211-022024021311-032024021411-042024021511-052024021611-062024021711-072024021801-082024040412+002024040512-012024040612-022024040702-032024042803+032024050113+002024050213-012024050313-022024050413-032024050513-042024051103-102024060814+022024060914+012024061014+002024091405+032024091515+022024091615+012024091715+002024092906+022024100116+002024100216-012024100316-022024100416-032024100516-042024100616-052024100716-062024101206-11';
    protected day: SolarDay;
    protected name: string;
    protected work: boolean;

    protected constructor(year: number, month: number, day: number, data: string) {
        super();
        this.day = SolarDay.fromYmd(year, month, day);
        this.work = 48 === data.charCodeAt(8);
        this.name = LegalHoliday.NAMES[data.charCodeAt(9) - 48];
    }

    static fromYmd(year: number, month: number, day: number): LegalHoliday | null {
        const y: string = (Array(4).join('0') + year).slice(-4);
        const m: string = (month < 10 ? '0' : '') + month;
        const d: string = (day < 10 ? '0' : '') + day;
        const matcher: RegExpExecArray | null = new RegExp(`${y}${m}${d}[0-1][0-8][+|-]\\d{2}`, 'g').exec(LegalHoliday.DATA);
        if (!matcher) {
            return null;
        }
        return new LegalHoliday(year, month, day, matcher[0]);
    }

    getName(): string {
        return this.name;
    }

    getDay(): SolarDay {
        return this.day;
    }

    isWork(): boolean {
        return this.work;
    }

    toString(): string {
        return `${this.day.toString()} ${this.name}(${this.work ? '班' : '休'})`
    }

    next(n: number): LegalHoliday | null {
        const m: SolarMonth = this.day.getMonth();
        const year: number = m.getYear().getYear();
        const month: number = m.getMonth();
        const day: number = this.day.getDay();
        if (n === 0) {
            return LegalHoliday.fromYmd(year, month, day);
        }
        let ys: string = (Array(4).join('0') + year).slice(-4);
        const ms: string = (month < 10 ? '0' : '') + month;
        const ds: string = (day < 10 ? '0' : '') + day;

        const data: string[] = [];
        const today: string = `${ys}${ms}${ds}`;
        let reg: RegExp = new RegExp(`${ys}\\d{4}[0-1][0-8][+|-]\\d{2}`, 'g');
        let matcher: RegExpExecArray | null = reg.exec(LegalHoliday.DATA);
        while (matcher) {
            data.push(matcher[0]);
            matcher = reg.exec(LegalHoliday.DATA);
        }
        let index: number = -1;
        let size: number = data.length;
        for (let i: number = 0; i < size; i++) {
            if (data[i].indexOf(today) === 0) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            return null;
        }
        index += n;
        let y: number = year;
        const forward: boolean = n > 0;
        const add: number = forward ? 1 : -1;
        while (forward ? (index >= size) : (index < 0)) {
            if (forward) {
                index -= size;
            }
            y += add;
            data.length = 0;
            ys = (Array(4).join('0') + y).slice(-4);
            reg = new RegExp(`${ys}\\d{4}[0-1][0-8][+|-]\\d{2}`, 'g');
            matcher = reg.exec(LegalHoliday.DATA);
            while (matcher) {
                data.push(matcher[0]);
                matcher = reg.exec(LegalHoliday.DATA);
            }
            size = data.length;
            if (size < 1) {
                return null;
            }
            if (!forward) {
                index += size;
            }
        }
        let d: string = data[index];
        return new LegalHoliday(parseInt(d.substring(0, 4), 10), parseInt(d.substring(4, 6), 10), parseInt(d.substring(6, 8), 10), d);
    }
}

export class SolarFestival extends AbstractTyme {
    static NAMES: string[] = ['元旦', '三八妇女节', '植树节', '五一劳动节', '五四青年节', '六一儿童节', '建党节', '八一建军节', '教师节', '国庆节'];
    static DATA: string = '@00001011950@01003081950@02003121979@03005011950@04005041950@05006011950@06007011941@07008011933@08009101985@09010011950';
    protected type: FestivalType;
    protected index: number;
    protected day: SolarDay;
    protected name: string;
    protected startYear: number;

    protected constructor(type: FestivalType, day: SolarDay, startYear: number, data: string) {
        super();
        this.type = type;
        this.day = day;
        this.startYear = startYear;
        this.index = parseInt(data.substring(1, 3), 10);
        this.name = SolarFestival.NAMES[this.index];
    }

    static fromIndex(year: number, index: number): SolarFestival | null {
        if (index < 0 || index >= SolarFestival.NAMES.length) {
            throw new Error(`illegal index: ${index}`);
        }
        const is: string = (index < 10 ? '0' : '') + index;
        const matcher: RegExpExecArray | null = new RegExp(`@${is}\\d+`, 'g').exec(SolarFestival.DATA);
        if (matcher) {
            const data: string = matcher[0];
            const type: number = data.charCodeAt(3) - 48;
            if (type === 0) {
                const startYear: number = parseInt(data.substring(8), 10);
                if (year >= startYear) {
                    return new SolarFestival(FestivalType.DAY, SolarDay.fromYmd(year, parseInt(data.substring(4, 6), 10), parseInt(data.substring(6, 8), 10)), startYear, data);
                }
            }
        }
        return null;
    }

    static fromYmd(year: number, month: number, day: number): SolarFestival | null {
        const m: string = (month < 10 ? '0' : '') + month;
        const d: string = (day < 10 ? '0' : '') + day;
        const matcher: RegExpExecArray | null = new RegExp(`@\\d{2}0${m}${d}\\d+`, 'g').exec(SolarFestival.DATA);
        if (matcher) {
            const data: string = matcher[0];
            const startYear: number = parseInt(data.substring(8), 10);
            if (year >= startYear) {
                return new SolarFestival(FestivalType.DAY, SolarDay.fromYmd(year, month, day), startYear, data);
            }
        }
        return null;
    }

    getName(): string {
        return this.name;
    }

    getIndex(): number {
        return this.index;
    }

    getDay(): SolarDay {
        return this.day;
    }

    getType(): FestivalType {
        return this.type;
    }

    getStartYear(): number {
        return this.startYear;
    }

    toString(): string {
        return `${this.day.toString()} ${this.name}`
    }

    next(n: number): SolarFestival | null {
        const m: SolarMonth = this.day.getMonth();
        const year: number = m.getYear().getYear();
        if (n === 0) {
            return SolarFestival.fromYmd(year, m.getMonth(), this.day.getDay());
        }
        const size: number = SolarFestival.NAMES.length;
        let t: number = this.index + n;
        const offset: number = this.indexOf(t, size);
        if (t < 0) {
            t -= size;
        }
        return SolarFestival.fromIndex(year + ~~(t / size), offset);
    }
}

export class LunarFestival extends AbstractTyme {
    static NAMES: string[] = ['春节', '元宵节', '龙头节', '上巳节', '清明节', '端午节', '七夕节', '中元节', '中秋节', '重阳节', '冬至节', '腊八节', '除夕'];
    static DATA: string = '@0000101@0100115@0200202@0300303@04107@0500505@0600707@0700715@0800815@0900909@10124@1101208@122';
    protected type: FestivalType;
    protected index: number;
    protected day: LunarDay;
    protected name: string;
    protected solarTerm: SolarTerm | null;

    protected constructor(type: FestivalType, day: LunarDay, solarTerm: SolarTerm | null, data: string) {
        super();
        this.type = type;
        this.day = day;
        this.solarTerm = solarTerm;
        this.index = parseInt(data.substring(1, 3), 10);
        this.name = LunarFestival.NAMES[this.index];
    }

    static fromIndex(year: number, index: number): LunarFestival | null {
        if (index < 0 || index >= LunarFestival.NAMES.length) {
            throw new Error(`illegal index: ${index}`);
        }
        const is: string = (index < 10 ? '0' : '') + index;
        const matcher: RegExpExecArray | null = new RegExp(`@${is}\\d+`, 'g').exec(LunarFestival.DATA);
        if (matcher) {
            const data: string = matcher[0];
            const type: number = data.charCodeAt(3) - 48;
            switch (type) {
                case 0:
                    return new LunarFestival(FestivalType.DAY, LunarDay.fromYmd(year, parseInt(data.substring(4, 6), 10), parseInt(data.substring(6), 10)), null, data);
                case 1:
                    const solarTerm: SolarTerm = SolarTerm.fromIndex(year, parseInt(data.substring(4), 10));
                    return new LunarFestival(FestivalType.TERM, solarTerm.getJulianDay().getSolarDay().getLunarDay(), solarTerm, data);
                case 2:
                    return new LunarFestival(FestivalType.EVE, LunarDay.fromYmd(year + 1, 1, 1).next(-1), null, data);
                default:
            }
        }
        return null;
    }

    static fromYmd(year: number, month: number, day: number): LunarFestival | null {
        const m: string = (month < 10 ? '0' : '') + month;
        const d: string = (day < 10 ? '0' : '') + day;
        let matcher: RegExpExecArray | null = new RegExp(`@\\d{2}0${m}${d}`, 'g').exec(LunarFestival.DATA);
        if (matcher) {
            return new LunarFestival(FestivalType.DAY, LunarDay.fromYmd(year, month, day), null, matcher[0]);
        }
        const reg: RegExp = new RegExp(`@\\d{2}1\\d{2}`, 'g');
        matcher = reg.exec(LunarFestival.DATA);
        while (matcher) {
            const data: string = matcher[0];
            const solarTerm: SolarTerm = SolarTerm.fromIndex(year, parseInt(data.substring(4), 10));
            const lunarDay: LunarDay = solarTerm.getJulianDay().getSolarDay().getLunarDay();
            const lunarMonth: LunarMonth = lunarDay.getMonth();
            if (lunarMonth.getYear().getYear() === year && lunarMonth.getMonth() === month && lunarDay.getDay() === day) {
                return new LunarFestival(FestivalType.TERM, lunarDay, solarTerm, data);
            }
            matcher = reg.exec(LegalHoliday.DATA);
        }
        matcher = new RegExp(`@\\d{2}2`, 'g').exec(LunarFestival.DATA);
        if (matcher) {
            const lunarDay: LunarDay = LunarDay.fromYmd(year, month, day);
            const nextDay: LunarDay = lunarDay.next(1);
            if (nextDay.getMonth().getMonth() === 1 && nextDay.getDay() === 1) {
                return new LunarFestival(FestivalType.EVE, lunarDay, null, matcher[0]);
            }
        }
        return null;
    }

    getName(): string {
        return this.name;
    }

    getIndex(): number {
        return this.index;
    }

    getDay(): LunarDay {
        return this.day;
    }

    getType(): FestivalType {
        return this.type;
    }

    getSolarTerm(): SolarTerm | null {
        return this.solarTerm;
    }

    toString(): string {
        return `${this.day.toString()} ${this.name}`
    }

    next(n: number): LunarFestival {
        const m: LunarMonth = this.day.getMonth();
        const year: number = m.getYear().getYear();
        if (n === 0) {
            return <LunarFestival>LunarFestival.fromYmd(year, m.getMonthWithLeap(), this.day.getDay());
        }
        const size: number = LunarFestival.NAMES.length;
        let t: number = this.index + n;
        const offset: number = this.indexOf(t, size);
        if (t < 0) {
            t -= size;
        }
        return <LunarFestival>LunarFestival.fromIndex(year + ~~(t / size), offset);
    }
}

export class EightChar extends AbstractCulture {
    protected year: SixtyCycle;
    protected month: SixtyCycle;
    protected day: SixtyCycle;
    protected hour: SixtyCycle;

    constructor(year: SixtyCycle | string, month: SixtyCycle | string, day: SixtyCycle | string, hour: SixtyCycle | string) {
        super();
        this.year = year instanceof SixtyCycle ? year : SixtyCycle.fromName(year);
        this.month = month instanceof SixtyCycle ? month : SixtyCycle.fromName(month);
        this.day = day instanceof SixtyCycle ? day : SixtyCycle.fromName(day);
        this.hour = hour instanceof SixtyCycle ? hour : SixtyCycle.fromName(hour);
    }

    getYear(): SixtyCycle {
        return this.year;
    }

    getMonth(): SixtyCycle {
        return this.month;
    }

    getDay(): SixtyCycle {
        return this.day;
    }

    getHour(): SixtyCycle {
        return this.hour;
    }

    getFetalOrigin(): SixtyCycle {
        return SixtyCycle.fromName(this.month.getHeavenStem().next(1).getName() + this.month.getEarthBranch().next(3).getName());
    }

    getFetalBreath(): SixtyCycle {
        return SixtyCycle.fromName(this.day.getHeavenStem().next(5).getName() + EarthBranch.fromIndex(13 - this.day.getEarthBranch().getIndex()).getName());
    }

    getOwnSign(): SixtyCycle {
        let offset: number = this.month.getEarthBranch().next(-1).getIndex() + this.hour.getEarthBranch().next(-1).getIndex();
        offset = (offset >= 14 ? 26 : 14) - offset;
        offset -= 1;
        return SixtyCycle.fromName(HeavenStem.fromIndex((this.year.getHeavenStem().getIndex() + 1) * 2 + offset).getName() + EarthBranch.fromIndex(2 + offset).getName());
    }

    getBodySign(): SixtyCycle {
        let offset: number = this.month.getEarthBranch().getIndex() + this.hour.getEarthBranch().getIndex();
        offset %= 12;
        offset -= 1;
        return SixtyCycle.fromName(HeavenStem.fromIndex((this.year.getHeavenStem().getIndex() + 1) * 2 + offset).getName() + EarthBranch.fromIndex(2 + offset).getName());
    }

    getDuty(): Duty {
        return Duty.fromIndex(this.day.getEarthBranch().getIndex() - this.month.getEarthBranch().getIndex());
    }

    getName(): string {
        return `${this.year.toString()} ${this.month.toString()} ${this.day.toString()} ${this.hour.toString()}`;
    }

    getSolarTimes(startYear: number, endYear: number): SolarTime[] {
        const l: SolarTime[] = [];
        // 月地支距寅月的偏移值
        let m: number = this.month.getEarthBranch().next(-2).getIndex();
        // 月天干要一致
        if (!HeavenStem.fromIndex((this.year.getHeavenStem().getIndex() + 1) * 2 + m).equals(this.month.getHeavenStem())) {
            return l;
        }
        // 1年的立春是辛酉，序号57
        let y: number = this.year.next(-57).getIndex() + 1;
        // 节令偏移值
        m *= 2;
        // 时辰地支转时刻，子时按零点算
        const h: number = this.hour.getEarthBranch().getIndex() * 2;
        const baseYear: number = startYear - 1;
        while (y <= endYear) {
            if (y >= baseYear) {
                // 立春为寅月的开始
                let term: SolarTerm = SolarTerm.fromIndex(y, 3);
                // 节令推移，年干支和月干支就都匹配上了
                if (m > 0) {
                    term = term.next(m);
                }
                let solarTime: SolarTime = term.getJulianDay().getSolarTime();
                if (solarTime.getDay().getMonth().getYear().getYear() >= startYear) {
                    let mi: number = 0;
                    let s: number = 0;
                    // 日干支和节令干支的偏移值
                    let solarDay: SolarDay = solarTime.getDay();
                    const d: number = this.day.next(-solarDay.getLunarDay().getSixtyCycle().getIndex()).getIndex();
                    if (d > 0) {
                        // 从节令推移天数
                        solarDay = solarDay.next(d);
                    } else if (h == solarTime.getHour()) {
                        // 如果正好是节令当天，且小时和节令的小时数相等的极端情况，把分钟和秒钟带上
                        mi = solarTime.getMinute();
                        s = solarTime.getSecond();
                    }
                    const solarMonth: SolarMonth = solarDay.getMonth();
                    const time: SolarTime = SolarTime.fromYmdHms(solarMonth.getYear().getYear(), solarMonth.getMonth(), solarDay.getDay(), h, mi, s);
                    // 验证一下
                    if (time.getLunarHour().getEightChar().equals(this)) {
                        l.push(time);
                    }
                }
            }
            y += 60;
        }
        return l;
    }
}

export class ChildLimitInfo {
    protected startTime: SolarTime;
    protected endTime: SolarTime;
    protected yearCount: number;
    protected monthCount: number;
    protected dayCount: number;
    protected hourCount: number;
    protected minuteCount: number;

    constructor(startTime: SolarTime, endTime: SolarTime, yearCount: number, monthCount: number, dayCount: number, hourCount: number, minuteCount: number) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.yearCount = yearCount;
        this.monthCount = monthCount;
        this.dayCount = dayCount;
        this.hourCount = hourCount;
        this.minuteCount = minuteCount;
    }

    getStartTime(): SolarTime {
        return this.startTime;
    }

    getEndTime(): SolarTime {
        return this.endTime;
    }

    getYearCount(): number {
        return this.yearCount;
    }

    getMonthCount(): number {
        return this.monthCount;
    }

    getDayCount(): number {
        return this.dayCount;
    }

    getHourCount(): number {
        return this.hourCount;
    }

    getMinuteCount(): number {
        return this.minuteCount;
    }
}

export interface ChildLimitProvider {
    getInfo(birthTime: SolarTime, term: SolarTerm): ChildLimitInfo;
}

export class DefaultChildLimitProvider implements ChildLimitProvider {
    getInfo(birthTime: SolarTime, term: SolarTerm): ChildLimitInfo {
        let seconds: number = Math.abs(term.getJulianDay().getSolarTime().subtract(birthTime));
        // 3天 = 1年，3天=60*60*24*3秒=259200秒 = 1年
        const year: number = ~~(seconds / 259200);
        seconds %= 259200;
        // 1天 = 4月，1天=60*60*24秒=86400秒 = 4月，85400秒/4=21600秒 = 1月
        const month: number = ~~(seconds / 21600);
        seconds %= 21600;
        // 1时 = 5天，1时=60*60秒=3600秒 = 5天，3600秒/5=720秒 = 1天
        const day: number = ~~(seconds / 720);
        seconds %= 720;
        // 1分 = 2时，60秒 = 2时，60秒/2=30秒 = 1时
        const hour: number = ~~(seconds / 30);
        seconds %= 30;
        // 1秒 = 2分，1秒/2=0.5秒 = 1分
        const minute: number = seconds * 2;

        const birthday: SolarDay = birthTime.getDay();
        const birthMonth: SolarMonth = birthday.getMonth();

        let d: number = birthday.getDay() + day;
        let h: number = birthTime.getHour() + hour;
        let mi: number = birthTime.getMinute() + minute;
        h += ~~(mi / 60);
        mi %= 60;
        d += ~~(h / 24);
        h %= 24;

        let sm: SolarMonth = SolarMonth.fromYm(birthMonth.getYear().getYear() + year, birthMonth.getMonth()).next(month);

        const dc: number = sm.getDayCount();
        if (d > dc) {
            d -= dc;
            sm = sm.next(1);
        }
        return new ChildLimitInfo(birthTime, SolarTime.fromYmdHms(sm.getYear().getYear(), sm.getMonth(), d, h, mi, birthTime.getSecond()), year, month, day, hour, minute);
    }
}

export class China95ChildLimitProvider implements ChildLimitProvider {
    getInfo(birthTime: SolarTime, term: SolarTerm): ChildLimitInfo {
        // 出生时刻和节令时刻相差的分钟数
        let minutes: number = ~~(Math.abs(term.getJulianDay().getSolarTime().subtract(birthTime)) / 60);
        const year: number = ~~(minutes / 4320);
        minutes %= 4320;
        const month: number = ~~(minutes / 360);
        minutes %= 360;
        const day: number = ~~(minutes / 12);

        const birthday: SolarDay = birthTime.getDay();
        const birthMonth: SolarMonth = birthday.getMonth();
        let sm: SolarMonth = SolarMonth.fromYm(birthMonth.getYear().getYear() + year, birthMonth.getMonth()).next(month);

        let d: number = birthday.getDay() + day;
        const dc: number = sm.getDayCount();
        if (d > dc) {
            d -= dc;
            sm = sm.next(1);
        }

        return new ChildLimitInfo(birthTime, SolarTime.fromYmdHms(sm.getYear().getYear(), sm.getMonth(), d, birthTime.getHour(), birthTime.getMinute(), birthTime.getSecond()), year, month, day, 0, 0);
    }
}

export class ChildLimit {
    static provider: ChildLimitProvider = new DefaultChildLimitProvider();
    protected eightChar: EightChar;
    protected gender: Gender;
    protected forward: boolean;
    protected info: ChildLimitInfo;

    protected constructor(birthTime: SolarTime, gender: Gender) {
        this.gender = gender;
        this.eightChar = birthTime.getLunarHour().getEightChar();
        // 阳男阴女顺推，阴男阳女逆推
        const yang: boolean = YinYang.YANG == this.eightChar.getYear().getHeavenStem().getYinYang();
        const man: boolean = Gender.MAN == gender;
        this.forward = (yang && man) || (!yang && !man);
        let term: SolarTerm = birthTime.getTerm();
        if (!term.isJie()) {
            term = term.next(-1);
        }
        if (this.forward) {
            term = term.next(2);
        }
        this.info = ChildLimit.provider.getInfo(birthTime, term);
    }

    static fromSolarTime(birthTime: SolarTime, gender: Gender): ChildLimit {
        return new ChildLimit(birthTime, gender);
    }

    getEightChar(): EightChar {
        return this.eightChar;
    }

    getGender(): Gender {
        return this.gender;
    }

    getYearCount(): number {
        return this.info.getYearCount();
    }

    getMonthCount(): number {
        return this.info.getMonthCount();
    }

    getDayCount(): number {
        return this.info.getDayCount();
    }

    getHourCount(): number {
        return this.info.getHourCount();
    }

    getMinuteCount(): number {
        return this.info.getMinuteCount();
    }

    getStartTime(): SolarTime {
        return this.info.getStartTime();
    }

    getEndTime(): SolarTime {
        return this.info.getEndTime();
    }

    isForward(): boolean {
        return this.forward;
    }

    getStartDecadeFortune(): DecadeFortune {
        return DecadeFortune.fromChildLimit(this, 0);
    }

    getStartFortune(): Fortune {
        return Fortune.fromChildLimit(this, 0);
    }
}

export class DecadeFortune extends AbstractTyme {
    protected childLimit: ChildLimit;
    protected index: number;

    protected constructor(childLimit: ChildLimit, index: number) {
        super();
        this.childLimit = childLimit;
        this.index = index;
    }

    static fromChildLimit(childLimit: ChildLimit, index: number): DecadeFortune {
        return new DecadeFortune(childLimit, index);
    }

    getStartAge(): number {
        return this.childLimit.getYearCount() + 1 + this.index * 10;
    }

    getEndAge(): number {
        return this.getStartAge() + 9;
    }

    getStartLunarYear(): LunarYear {
        return this.childLimit.getEndTime().getLunarHour().getDay().getMonth().getYear().next(this.index * 10);
    }

    getEndLunarYear(): LunarYear {
        return this.getStartLunarYear().next(9);
    }

    getSixtyCycle(): SixtyCycle {
        return this.childLimit.getEightChar().getMonth().next(this.childLimit.isForward() ? this.index + 1 : -this.index - 1);
    }

    getName(): string {
        return this.getSixtyCycle().getName();
    }

    next(n: number): DecadeFortune {
        return DecadeFortune.fromChildLimit(this.childLimit, this.index + n);
    }

    getStartFortune(): Fortune {
        return Fortune.fromChildLimit(this.childLimit, this.index * 10);
    }
}

export class Fortune extends AbstractTyme {
    protected childLimit: ChildLimit;
    protected index: number;

    protected constructor(childLimit: ChildLimit, index: number) {
        super();
        this.childLimit = childLimit;
        this.index = index;
    }

    static fromChildLimit(childLimit: ChildLimit, index: number): Fortune {
        return new Fortune(childLimit, index);
    }

    getAge(): number {
        return this.childLimit.getYearCount() + 1 + this.index;
    }

    getLunarYear(): LunarYear {
        return this.childLimit.getEndTime().getLunarHour().getDay().getMonth().getYear().next(this.index);
    }

    getSixtyCycle(): SixtyCycle {
        const n: number = this.getAge();
        return this.childLimit.getEightChar().getHour().next(this.childLimit.isForward() ? n : -n);
    }

    getName(): string {
        return this.getSixtyCycle().getName();
    }

    next(n: number): Fortune {
        return Fortune.fromChildLimit(this.childLimit, this.index + n);
    }
}
