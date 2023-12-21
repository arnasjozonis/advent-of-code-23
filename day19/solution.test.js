
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';

const example = parseString(`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`, true);

const data = parseTask('day19', true);

describe('Aplenty solution', () => {
  // it('should return 19114 for example data', () => {
  //   expect(solution(example)).toEqual(19114);
  // });

  // it('should return answer for input data', () => {
  //   expect(solution(data)).toEqual(367602);
  // });

  it('should return 167409079868000 for example data', () => {
    expect(solutionV2(example)).toEqual(4000 * 4000 * 4000 * 4000);
  });

  it('should return answer for input data', () => {
    expect(solutionV2(data)).toEqual(4000 * 4000 * 4000 * 4000);
  });

});
