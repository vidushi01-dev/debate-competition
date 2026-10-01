export interface Ranked<T> { rank: number; tied: boolean; value: number; schoolId: number; schoolName: string; extra: T }
export function rankByValue<T>(rows: { schoolId: number; schoolName: string; value: number; extra: T }[]): Ranked<T>[] {
  const sorted = [...rows].sort((a,b)=>b.value-a.value || a.schoolName.localeCompare(b.schoolName));
  const out: Ranked<T>[] = [];
  sorted.forEach((r,i)=>{ const rank=i>0&&sorted[i-1].value===r.value?out[i-1].rank:i+1; out.push({rank,tied:false,value:r.value,schoolId:r.schoolId,schoolName:r.schoolName,extra:r.extra}); });
  out.forEach(r=>{r.tied=out.some(o=>o!==r&&o.rank===r.rank);});
  return out;
}
const round2=(n:number)=>Math.round(n*100)/100;
export function rankRound(entries:{schoolId:number;schoolName:string;participantName?:string|null;value:number|null}[]){
  return rankByValue(entries.filter((e):e is typeof e & {value:number}=>e.value!==null).map(e=>({schoolId:e.schoolId,schoolName:e.schoolName,value:e.value,extra:{participantName:e.participantName??null}})));
}
export function eventTotals(schools:{id:number;name:string}[], rounds:{published:boolean;scores:{schoolId:number;value:number|null}[]}[], publishedOnly=true){
  const totals=new Map<number,number>(); const counted=new Map<number,number>();
  for(const r of (publishedOnly?rounds.filter(x=>x.published):rounds)) for(const s of r.scores) if(s.value!==null){totals.set(s.schoolId,round2((totals.get(s.schoolId)??0)+s.value));counted.set(s.schoolId,(counted.get(s.schoolId)??0)+1);}
  return rankByValue(schools.filter(s=>counted.has(s.id)).map(s=>({schoolId:s.id,schoolName:s.name,value:totals.get(s.id)!,extra:{roundsCounted:counted.get(s.id)!}})));
}
export function grandTotal(schools:{id:number;name:string}[], maps:Record<string,Map<number,number>>){const slugs=Object.keys(maps);return rankByValue(schools.map(s=>{const per=Object.fromEntries(slugs.map(k=>[k,maps[k].get(s.id)??0]));return {schoolId:s.id,schoolName:s.name,value:round2(slugs.reduce((a,k)=>a+(maps[k].get(s.id)??0),0)),extra:per};}).filter(r=>slugs.some(k=>maps[k].has(r.schoolId))));}
