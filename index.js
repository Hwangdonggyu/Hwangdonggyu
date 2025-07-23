import { writeFileSync } from 'node:fs';
import Parser from "rss-parser"

let text = `
### 💬About me
- 🏫 Hankuk University of Foreign Studies(HUFS) CSE
- 🏢 School major Academy TAB
- 🏢 UMC 4th Node.js part member
- ✈️Attended a short-term AI/SW study abroad program 2023.03.29 ~ 2024.04.07
- 🏢 HUFS LAB HAI Undergraduate researcher 2023.12~ 2025.07

### 📚Skill
<hr />
<br />
<div align="center">
  <img src="https://skillicons.dev/icons?i=python,c,java,html,css,javascript" />
  <img src="https://skillicons.dev/icons?i=vscode,github,git,anaconda,pytorch,tensorflow" /><br>
</div>

<br/>
<hr/>

### Tech blog

<a href="https://velog.io/@acadias12"><img src="https://img.shields.io/badge/Velog-20C997?style=flat-round&logo=velog&logoColor=white"/></a>
<a href="https://hwangdonggyu.github.io/"><img src="https://img.shields.io/badge/githubpages-222222?style=flat-round&logo=githubpages&logoColor=white"/></a>

### 💬Contact

\`\`\`
📧 E-mail : hdg2342@naver.com
\`\`\`

</br>

![Dong_gyu's GitHub stats](https://github-readme-stats.vercel.app/api?username=Hwangdonggyu&show_icons=true&theme=vision-friendly-dark)
`;



const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Node.js RSS Parser)',
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://huray.tistory.com/rss'); // 본인의 블로그 주소
    const postCount = Math.min(feed.items.length, 10)

    text += `<ul>`;

    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < postCount; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;

    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();
