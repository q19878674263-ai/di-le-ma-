
import { QuizQuestion, HorseResult, Post } from './types';

export const COLORS = {
  mossGreen: '#1A2F1A',
  sandYellow: '#F5E8C7',
  retroRed: '#A72B2B',
  softOrange: '#E6A23C',
  duskyBlue: '#4A5568',
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 'Q1', text: '凌晨 1 点，领导在群里发奋斗鸡汤，你会立刻回表情包点赞吗？' },
  { id: 'Q2', text: '开会没人认领失误，你会因为受不了沉默而主动跳出来“复盘”吗？'},
  { id: 'Q3', text: '同事理所当然地让你顺手取快递/改文档，你会笑着接过来吗？' },
  { id: 'Q4', text: '目睹同事靠拍马屁抢走你的功劳，你还能对着他点头微笑吗？' },
  { id: 'Q5', text: '如果公司明天取消厕纸和加班餐，你会为了保住工作默默接受吗？' },
];

export const HORSE_RESULTS: Record<string, HorseResult> = {
  '旋转木马': { 
    id: 'carousel', 
    name: '旋转木马', 
    description: '虽然每天都在忙，但原地踏步的姿势很优美。', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPup1pa51edbfYgVZz9scTDZ-rS0kyNAAC4B0AAqA-WVdc1Er98p7d5zgE' 
  },
  '收款马': { 
    id: 'pay', 
    name: '收款马', 
    description: '什么都不想干只想坐着收款', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPuqJpa55D9G3PSzuHRV2J7dnf0ByMgQAC5h0AAqA-WVeRs-oHSaULPDgE' 
  },
  '马屁': { 
    id: 'flattery', 
    name: '马屁', 
    description: '不是我在拍,是我的手忍不住为领导鼓掌', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPuqRpa56QHTnI3KxWLg7jCPPpoy3IgAAC6R0AAqA-WVfhkbGrDw2RAzgE' 
  },
  '哈吉马': { 
    id: 'haji', 
    name: '哈吉马', 
    description: '这我不干，不是我的锅，哈吉嘛！！！', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPuqVpa57QnjAx9DNNj1WbDHTbgNIVUwAC6x0AAqA-WVeJTIZ6Il5CJzgE' 
  },
  '踏马': { 
    id: 'trample', 
    name: '踏马', 
    description: '每天都在问候TM，但消息从未发出.', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPuqVpa57QnjAx9DNNj1WbDHTbgNIVUwAC6x0AAqA-WVeJTIZ6Il5CJzgE' 
  },
  '黄阿马': { 
    id: 'emperor', 
    name: '黄阿马', 
    description: '架子这么大，官一定也很大吧?', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPurFpa59Tl5UaCe9xsS3bc4qO82LDwgAC-B0AAqA-WVe-UGnKPJDBMjgE' 
  },
  '骡马': { 
    id: 'mule', 
    name: '骡马', 
    description: '条条大路通罗马，但骡马，狗屁不通.', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPurFpa59Tl5UaCe9xsS3bc4qO82LDwgAC-B0AAqA-WVe-UGnKPJDBMjgE' 
  },
  '班马': { 
    id: 'zebra', 
    name: '班马', 
    description: '一只上着普通版的普通马 ，略懂一点人性.', 
    image: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPurppa5_C_RpD7KNc4SdslP_xdGPt-wACAh4AAqA-WVctNS_jDBIxYDgE' 
  },
};

export const MOCK_POSTS: Post[] = [
  { id: '1', type: '破口大马', author: '碎嘴祺嫔', content: '那贱人竟然说我的PPT背景颜色太艳，她懂不懂什么叫大红大紫的富贵感？', timestamp: '10分钟前' },
  { id: '2', type: '电子草料', author: '安小主', content: '其实如何在周报里把自己做得像做了一年，关键在于使用“赋能、闭环、抓手”这三个词。', timestamp: '1小时前' },
  { id: '3', type: '破口大马', author: '叶澜依', content: '拽妃驾到！领导让我周六去团建，我直接回了个“没空”。爽！', timestamp: '3小时前' },
  { id: '4', type: '电子草料', author: '温太医', content: '遇到甩锅，先诊断，再开药。截图是你的保命丸。', timestamp: '5小时前' },
];
