import nlp from "https://cdn.skypack.dev/compromise@v13.11.3?dts";
import adj from "https://cdn.skypack.dev/compromise-adjectives@v0.0.7?dts";
import { Denops } from "https://lib.deno.dev/x/denops_std@v1/mod.ts";
import { execute } from "https://lib.deno.dev/x/denops_std@v1/helper/mod.ts";
import * as fn from "https://lib.deno.dev/x/denops_std@v1/function/mod.ts";
import { options } from "https://lib.deno.dev/x/denops_std@v1/variable/mod.ts";
import { map } from "https://lib.deno.dev/x/denops_std@v1/mapping/mod.ts";

type ConvertibleForm<T> = T extends `to${infer S}` ? S : never;

const AdjectiveFormList: string[] = [
  "Superlative",
  "Comparative",
  "Adverb",
  "Verb",
  "Noun",
]

const NounFormList: string[] = [
  "Plural",
  "Singular",
  "Possessive",
  "LowerCase",
  "UpperCase",
  "CamelCase",
  "TitleCase",
  "Quoations",
  "Parentheses",
];

const VerbFormList: string[] = [
  "LowerCase",
  "UpperCase",
  "CamelCase",
  "TitleCase",
  "Quoations",
  "PastTense",
  "FutureTense",
  "PresentTense",
  "Infinitive",
  "Gerund",
  "Participle",
  "Positive",
  "Negative",
  "Parentheses",
];

export async function main(denops: Denops) {
  denops.dispatcher = {
    async NounFormList(A: unknown) {
      return NounFormList.filter((form)=>form.includes(A as string))
    },
    async VerbFormList(A: unknown) {
      return VerbFormList.filter((form)=>form.includes(A as string))
    },
    async AdjectiveFormList(A: unknown) {
      return AdjectiveFormList.filter((form)=>form.includes(A as string))
    },
    async NounsTo(form: unknown, start: unknown, end: unknown) {
      // thanks: https://stackoverflow.com/questions/1533565/how-to-get-visually-selected-text-in-vimscript
      const lstart = start as number;
      const lend = end as number;
      const selection = await options.get(denops, "selection", "inclusive");
      const d = selection === "inclusive" ? 0 : 1;
      const cstart = (await fn.getpos(denops, "'<"))[2];
      const cend = (await fn.getpos(denops, "'>"))[2] - d;
      const before = await fn.getline(denops, lstart, lend);
      before[before.length - 1] = before[before.length - 1].slice(0, cend);
      before[0] = before[0].slice(cstart - 1);
      const sentence = nlp(before.join("\n"));
      const nouns = sentence.nouns();
      if (NounFormList.includes(form as string)) {
        const _form = form as ConvertibleForm<keyof typeof nouns>;
        nouns[`to${_form}` as const]();
        const after = sentence.text().split("\n");
        if (lstart === lend) {
          const b = before.join("\n");
          const a = after.join("\n");
          denops.cmd(
            `${lstart},${lend}normal ${cstart}|c${cend - cstart + 1}l${a}`,
          );
          console.log(
            `edited at line ${lstart}-${lend}, column ${cstart}-${cend}: ${b} -> ${a}`,
          );
        } else {
          for (let i = lstart; i <= lend; i++) {
            const b = before[i - lstart];
            const a = after[i - lstart];
            denops.cmd(`call setline(${i}, '${a.replace(/'/, "\\'")}')`);
            console.log(`edited at line ${i}: ${b} -> ${a}`);
          }
        }
      } else {
        console.log(`${form} is invalid`);
      }
    },
    async VerbsTo(form: unknown, start: unknown, end: unknown) {
      // thanks: https://stackoverflow.com/questions/1533565/how-to-get-visually-selected-text-in-vimscript
      const lstart = start as number;
      const lend = end as number;
      const selection = await options.get(denops, "selection", "inclusive");
      const d = selection === "inclusive" ? 0 : 1;
      const cstart = (await fn.getpos(denops, "'<"))[2];
      const cend = (await fn.getpos(denops, "'>"))[2] - d;
      const before = await fn.getline(denops, lstart, lend);
      before[before.length - 1] = before[before.length - 1].slice(0, cend);
      before[0] = before[0].slice(cstart - 1);
      const sentence = nlp(before.join("\n"));
      const verbs = sentence.verbs();
      if (VerbFormList.includes(form as string)) {
        const _form = form as ConvertibleForm<keyof typeof verbs>;
        verbs[`to${_form}` as const]();
        const after = sentence.text().split("\n");
        if (lstart === lend) {
          const b = before.join("\n");
          const a = after.join("\n");
          denops.cmd(
            `${lstart},${lend}normal ${cstart}|c${cend - cstart + 1}l${a}`,
          );
          console.log(
            `edited at line ${lstart}-${lend}, column ${cstart}-${cend}: ${b} -> ${a}`,
          );
        } else {
          for (let i = lstart; i <= lend; i++) {
            const b = before[i - lstart];
            const a = after[i - lstart];
            denops.cmd(`call setline(${i}, '${a.replace(/'/, "\\'")}')`);
            console.log(`edited at line ${i}: ${b} -> ${a}`);
          }
        }
      } else {
        console.log(`${form} is invalid`);
      }
    },
    async AdjectivesTo(form: unknown, start: unknown, end: unknown) {
      // thanks: https://stackoverflow.com/questions/1533565/how-to-get-visually-selected-text-in-vimscript
      const lstart = start as number;
      const lend = end as number;
      const selection = await options.get(denops, "selection", "inclusive");
      const d = selection === "inclusive" ? 0 : 1;
      const cstart = (await fn.getpos(denops, "'<"))[2];
      const cend = (await fn.getpos(denops, "'>"))[2] - d;
      const before = await fn.getline(denops, lstart, lend);
      before[before.length - 1] = before[before.length - 1].slice(0, cend);
      before[0] = before[0].slice(cstart - 1);
      const sentence = nlp.extend(adj)(before.join("\n"));
      const adjectives = sentence.adjectives();
      if (AdjectiveFormList.includes(form as string)) {
        const _form = form as ConvertibleForm<keyof typeof adjectives>;
        adjectives[`to${_form}` as const]();
        const after = sentence.text().split("\n");
        if (lstart === lend) {
          const b = before.join("\n");
          const a = after.join("\n");
          denops.cmd(
            `${lstart},${lend}normal ${cstart}|c${cend - cstart + 1}l${a}`,
          );
          console.log(
            `edited at line ${lstart}-${lend}, column ${cstart}-${cend}: ${b} -> ${a}`,
          );
        } else {
          for (let i = lstart; i <= lend; i++) {
            const b = before[i - lstart];
            const a = after[i - lstart];
            denops.cmd(`call setline(${i}, '${a.replace(/'/, "\\'")}')`);
            console.log(`edited at line ${i}: ${b} -> ${a}`);
          }
        }
      } else {
        console.log(`${form} is invalid`);
      }
    },
    async VerbTo(form: unknown) {
      const before = await fn.expand(denops, "<cword>") as string;
      const verbs = nlp(before).verbs();
      if (VerbFormList.includes(form as string)) {
        const _form = form as ConvertibleForm<keyof typeof verbs>;
        const after = verbs[`to${_form}` as const]().text();
        denops.cmd(`normal ciw${after}`);
        console.log(`edited: ${before} -> ${after}`);
      } else {
        console.log(`${form} is invalid`);
      }
    },
    async NounTo(form: unknown) {
      const before = await fn.expand(denops, "<cword>") as string;
      const nouns = nlp(before).nouns();
      if (NounFormList.includes(form as string)) {
        const _form = form as ConvertibleForm<keyof typeof nouns>;
        const after = nouns[`to${_form}` as const]().text();
        denops.cmd(`normal ciw${after}`);
        console.log(`edited: ${before} -> ${after}`);
      } else {
        console.log(`${form} is invalid`);
      }
    },
    async AdjectiveTo(form: unknown) {
      const before = await fn.expand(denops, "<cword>") as string;
      const adjectives = nlp.extend(adj)(before).adjectives();
      if (AdjectiveFormList.includes(form as string)) {
        const _form = form as ConvertibleForm<keyof typeof adjectives>;
        const after = adjectives[`to${_form}` as const]().text();
        denops.cmd(`normal ciw${after}`);
        console.log(`edited: ${before} -> ${after}`);
      } else {
        console.log(`${form} is invalid`);
      }
    },
  };

  {
    const opts = { noremap: true, mode: "n" as const}

    map(denops, "<leader>np", ":NounTo Plural<CR>", opts)
    map(denops, "<leader>ns", ":NounTo Singular<CR>", opts)
    map(denops, "<leader>nq", ":NounTo Possessive<CR>", opts)
    map(denops, "<leader>nt", ":NounTo TitleCase<CR>", opts)
    map(denops, "<leader>nl", ":NounTo LowerCase<CR>", opts)
    map(denops, "<leader>nu", ":NounTo UpperCase<CR>", opts)
    map(denops, "<leader>nc", ":NounTo CamelCase<CR>", opts)

    map(denops, "<leader>vp", ":VerbTo PastTense<CR>", opts)
    map(denops, "<leader>va", ":VerbTo Participle<CR>", opts)
    map(denops, "<leader>vi", ":VerbTo Infinitive<CR>", opts)
    map(denops, "<leader>vg", ":VerbTo Gerund<CR>", opts)
    map(denops, "<leader>vc", ":VerbTo PresentTense<CR>", opts)
    map(denops, "<leader>vf", ":VerbTo FutureTense<CR>", opts)
    map(denops, "<leader>v+", ":VerbTo Positive<CR>", opts)
    map(denops, "<leader>v-", ":VerbTo Negative<CR>", opts)

    map(denops, "<leader>as", ":AdjectiveTo Superlative<CR>", opts)
    map(denops, "<leader>ac", ":AdjectiveTo Comparative<CR>", opts)
    map(denops, "<leader>aa", ":AdjectiveTo Adverb<CR>", opts)
    map(denops, "<leader>av", ":AdjectiveTo Verb<CR>", opts)
    map(denops, "<leader>an", ":AdjectiveTo Noun<CR>", opts)

  }
  {
    const opts = { noremap: true, mode: "v" as const}

    map(denops, "<leader>np", ":'<,'>NounsTo Plural<CR>", opts)
    map(denops, "<leader>ns", ":'<,'>NounsTo Singular<CR>", opts)
    map(denops, "<leader>nq", ":'<,'>NounsTo Possessive<CR>", opts)
    map(denops, "<leader>nt", ":'<,'>NounsTo TitleCase<CR>", opts)
    map(denops, "<leader>nl", ":'<,'>NounsTo LowerCase<CR>", opts)
    map(denops, "<leader>nu", ":'<,'>NounsTo UpperCase<CR>", opts)
    map(denops, "<leader>nc", ":'<,'>NounsTo CamelCase<CR>", opts)

    map(denops, "<leader>vp", ":'<,'>VerbsTo PastTense<CR>", opts)
    map(denops, "<leader>va", ":'<,'>VerbsTo Participle<CR>", opts)
    map(denops, "<leader>vi", ":'<,'>VerbsTo Infinitive<CR>", opts)
    map(denops, "<leader>vg", ":'<,'>VerbsTo Gerund<CR>", opts)
    map(denops, "<leader>vc", ":'<,'>VerbsTo PresentTense<CR>", opts)
    map(denops, "<leader>vf", ":'<,'>VerbsTo FutureTense<CR>", opts)
    map(denops, "<leader>v+", ":'<,'>VerbsTo Positive<CR>", opts)
    map(denops, "<leader>v-", ":'<,'>VerbsTo Negative<CR>", opts)

    map(denops, "<leader>as", ":'<,'>AdjectivesTo Superlative<CR>", opts)
    map(denops, "<leader>ac", ":'<,'>AdjectivesTo Comparative<CR>", opts)
    map(denops, "<leader>aa", ":'<,'>AdjectivesTo Adverb<CR>", opts)
    map(denops, "<leader>av", ":'<,'>AdjectivesTo Verb<CR>", opts)
    map(denops, "<leader>an", ":'<,'>AdjectivesTo Noun<CR>", opts)
  }

  execute(
    denops,
    `
      function NounFormList(A,L,P)
        return denops#request('${denops.name}', 'NounFormList', [a:A])
      endfunction
      function VerbFormList(A,L,P)
        return denops#request('${denops.name}', 'VerbFormList', [a:A])
      endfunction
      function AdjectiveFormList(A,L,P)
        return denops#request('${denops.name}', 'AdjectiveFormList', [a:A])
      endfunction
      command! -nargs=1 -complete=customlist,NounFormList NounTo call denops#notify('${denops.name}', 'NounTo', [<q-args>])
      command! -nargs=1 -complete=customlist,VerbFormList VerbTo call denops#notify('${denops.name}', 'VerbTo', [<q-args>])
      command! -nargs=1 -complete=customlist,AdjectiveFormList AdjectiveTo call denops#notify('${denops.name}', 'AdjectiveTo', [<q-args>])
      command! -nargs=1 -range -complete=customlist,VerbFormList VerbsTo call denops#notify('${denops.name}', 'VerbsTo', [<q-args>, <line1>, <line2>])
      command! -nargs=1 -range -complete=customlist,NounFormList NounsTo call denops#notify('${denops.name}', 'NounsTo', [<q-args>, <line1>, <line2>])
      command! -nargs=1 -range -complete=customlist,AdjectiveFormList AdjectivesTo call denops#notify('${denops.name}', 'AdjectivesTo', [<q-args>, <line1>, <line2>])
  `,
  );
}
