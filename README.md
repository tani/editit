# EditIt

We edit it magically.

## Installation

For vim-plug,

```vim
" init.vim
Plug 'vim-denops/denops.vim'
Plug 'tani/editit'
```

For Packer,

```lua
-- init.lua
use { 'tani/editit' requires={'vim-denops/denops.vim'} }
```

## Usage

|command                             |mapping     |example                     |
|:-----------------------------------|:-----------|:---------------------------|
|`:NounTo Singular`                  |`<leader>ns`|apples -> apple             |
|`:NounTo Plural`                    |`<leader>np`|apple -> apples             |
|`:NounTo Possesive`                 |`<leader>ng`|apple -> apple's            |
|`:NounTo TitleCase`                 |`<leader>nt`|apple -> Apple              |
|`:NounTo LowerCase`                 |`<leader>nl`|Apple -> apple              |
|`:NounTo UpperCase`                 |`<leader>nu`|apple -> APPLE              |
|`:NounTo CamelCase`                 |`<leader>nc`|apple -> apple              |
|`:'<,'>NounsTo Singular`            |`<leader>ns`|cats and dogs -> cat and dog|
|`:'<,'>NounsTo Plural`              |`<leader>np`|cat and dog -> cats and dogs|
|`:'<,'>NounsTo Possesive`           |`<leader>nq`|apple pie -> apple pie's    |
|`:'<,'>NounsTo TitleCase`           |`<leader>nt`|cat and dog -> Cat and Dog  |
|`:'<,'>NounsTo LowerCase`           |`<leader>nl`|Cat and Dog -> cat and dog  |
|`:'<,'>NounsTo UpperCase`           |`<leader>nu`|cat and dog -> CAT and DOG  |
|`:'<,'>NounsTo CamelCase`           |`<leader>nc`|apple pie -> applePie       |
|`:VerbTo PastTense`                 |`<leader>vp`|write -> wrote              |
|`:VerbTo Participle`                |`<leader>va`|write -> have written       |
|`:VerbTo Infinitive`                |`<leader>vi`|wrote -> write              |
|`:VerbTo Gerund`                    |`<leader>vg`|write -> writing            |
|`:VerbTo PresentTense`              |`<leader>vc`|wrote -> write              |
|`:VerbTo FutureTense`               |`<leader>vf`|wrote -> will write         |
|`:VerbTo Positive`                  |`<leader>v+`|write -> write              |
|`:VerbTo Negative`                  |`<leader>v-`|write -> write              |
|`:'<,'>VerbsTo PastTense`           |`<leader>vp`|I walk. -> I walked.        |
|`:'<,'>VerbsTo Participle`          |`<leader>va`|I walk. -> I have walked.   |
|`:'<,'>VerbsTo Infinitive`          |`<leader>vi`|I walk. -> I walk.          |
|`:'<,'>VerbsTo Gerund`              |`<leader>vg`|I walk -> I walking.        |
|`:'<,'>VerbsTo PresentTense`        |`<leader>vc`|I walked -> I walk.         |
|`:'<,'>VerbsTo FutureTense`         |`<leader>vf`|I walk. -> I will walk.     |
|`:'<,'>VerbsTo Positive`            |`<leader>v+`|I do not walk -> I walk.    |
|`:'<,'>VerbsTo Negative`            |`<leader>v-`|I walk. -> I do not walk.   |
|`:AdjectiveVerbTo Superlative`      |`<leader>as`|fast -> fastest             |
|`:AdjectiveVerbTo Comparative`      |`<leader>ac`|fast -> faster              |
|`:AdjectiveVerbTo Adverb`           |`<leader>aa`|quick -> quickly            |
|`:AdjectiveVerbTo Verb`             |`<leader>av`|fast -> fasten              |
|`:AdjectiveVerbTo Noun`             |`<leader>an`|fast -> fastness            |
|`:'<,'>AdjectivesVerbTo Superlative`|`<leader>as`|Walk fast. -> Walk fast.    |
|`:'<,'>AdjectivesVerbTo Comparative`|`<leader>ac`|Walk fast. -> Walk fast.    |
|`:'<,'>AdjectivesVerbTo Adverb`     |`<leader>aa`|Walk fast. -> Walk fast.    |
|`:'<,'>AdjectivesVerbTo Verb`       |`<leader>av`|Walk fast. -> Walk fast.    |
|`:'<,'>AdjectivesVerbTo Noun`       |`<leader>an`|Walk fast. -> Walk fast.    |

### Acknowledgment

- [denops.vim](https://github.com/vim-denops/denops.vim),
- [compromise](https://github.com/spencermountain/compromise),
- and your contributions

### Copyright and License

Copyright 2021 &copy; TANIGUCHI Masaya All Rights Reserved.

This software is distributed under MIT License.

