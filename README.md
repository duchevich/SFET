![version](https://img.shields.io/badge/dynamic/json.svg?label=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fseniorro%2Fsfet%2Fmaster%2Fpackage.json&query=version&colorB=green)
![license](https://img.shields.io/badge/dynamic/json.svg?label=license&url=https%3A%2F%2Fraw.githubusercontent.com%2Fseniorro%2Fsfet%2Fmaster%2Fpackage.json&query=license&colorB=blue)

# Seniorro Front-End Toolkit (SFET)
SFET - это стек технологий для разработки front-end, содержит:
- таски для системы сборки Gulp;
- упрощенную интерпритацию нейминга методоголии БЭМ;
- микрофремворк содержащий базовые блоки необходимые на каждом проекте;
- коллекцию блоков готовых к легкому применению на прокте;
- базовый шаблон проекта для быстрого старта.

## Содержание
- [Файловая структура](#Файловая-структура)
- [Соглашение об именовании](#Соглашение-об-именовании)
    - [Полезное чтиво](#Полезное-чтиво)
    - [Спецификация](#Спецификация)
- [Быстрый старт](#Быстрый-старт)
- [Планы развития](#Планы-развития)
- [Копирайт и лицензия](#Копирайт-и-лицензия)

## Файловая структура
- `_src/`
    - `blocks/` - коллекция проектных блоков.
        - `{blockName}/`
            - `vendors/`
            - `{blockName}.js`
            - `{blockName}.less`
    - `mixins.less` - коллекция проектных миксинов для less.
    - `variables.js` - коллекция проектных глобальных переменных для js.
    - `variables.less` - коллекция проектных глобальных переменных для less.
- `dist/`
    - `dynamic/`
    - `static/`
        - `favicon/`
        - `fonts/`
        - `images/`
        - `scripts.min.js`
        - `styles.min.css`
    - `footer.php`
    - `header.php`
    - `index.php`
    - `robots.txt`
- `lib/` - коллекция блоков.
- `_config.js` - файл конфигурации SFET.
- `_declaration.js`  - декрарация в которой нужно указывать блоки проекта, можно контролировать очередь загрузки css и js.
- `gulpfile.js`  - файл конфигурации системы сборки Gulp (обычно не требует никакого вмешательства, вноси изминения исключительно зная что делаешь и на свой страх и риск).
- `package.json` и `package-lock.json` - файлы пакетного менеджера NPM.

## Соглашение об именовании
Система именования SFET организована основываясь на методологии БЭМ.

### Прочти
- Официальная документация БЭМ
    - [Быстрый старт](https://ru.bem.info/methodology/quick-start/)
    - [Основные понятия](https://ru.bem.info/methodology/key-concepts/)
    - [Соглашение по именованию](https://ru.bem.info/methodology/naming-convention/)
    - [CSS по БЭМ](https://ru.bem.info/methodology/css/)
- [Неофициальная краткая документация БЭМ](http://nicothin.github.io/idiomatic-pre-CSS/)

### Спецификация
- SFET использует смесь стилей [React](https://ru.bem.info/methodology/naming-convention/#%D0%A1%D1%82%D0%B8%D0%BB%D1%8C-react) и [No-namespace](https://ru.bem.info/methodology/naming-convention/#%D0%A1%D1%82%D0%B8%D0%BB%D1%8C-no-namespace):
    - Если имя блока, елемента или модификатора содержит несколько слов - разделяй их используя camelSpace.
    - Между блоком и елементом используй "-". Например, `.block-elem`.
    - Используй префикс "_" для модификаторов. Например, `._mod`.
- Названия папки и файлов блока дожно включать в себя исключительно его название. Например, `block/block.*`.
- Присваивай class блока html-елементу (например, `class="block"`), даже если к нему нет стилей, это позволяет определить его область.
- Используй идентификаторы только для связи с js, каждый id должен включать префикс с названием блока указанный через "-". Например, `#block-*`.
- Включай во все data-атрибуты название блока в нижнем регистре (camelSpace вызовет семантические ошибки при чтении). Например, `data-block-*="..."`.

## Быстрый старт
- [Скачай](https://github.com/Seniorro/SFET/archive/master.zip) или склонируй репозиторий: `git clone https://github.com/Seniorro/SFET.git`.
- У тебя должны быть установлены [Node.js](https://nodejs.org/) и [PHP](http://php.net/downloads.php).
- Установи зависимости из `package.json`: `npm install`.
- Запусти [встроенный веб-сервер CLI SAPI](http://php.net/manual/ru/features.commandline.webserver.php) в директории `dist/`: `cd dist && php -S 127.0.0.1:8000`
- Используй такси Gulp:
    - `gulp` (`gulp default`)
    - `gulp build`
    - `gulp script`
    - `gulp styles`
    - `gulp del`

## Планы развития
- Мигровать с Less на Sass (scss).
- Наполнить коллекцию миксинов.
- Найти замену блоку grid построенную на flexbox.

## Копирайт и лицензия
© 2017-2018 [Seniorro](https://seniorro.com). Код опубликован за лицензией [MIT](https://github.com/Seniorro/SFET/blob/master/LICENSE).