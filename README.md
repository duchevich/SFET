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
- [Структура](#Структура)
- [Соглашение об именовании](#Соглашение-об-именовании)
    - [Полезное чтиво](#Полезное-чтиво)
    - [Спецификация и советы](#Спецификация-и-советы)
- [Быстрый старт](#Быстрый-старт)
- [Планы развития](#Планы-развития)
- [Авторы](#Авторы)
- [Копирайт и лицензия](#Копирайт-и-лицензия)

## Структура
- `src/`
    - `blocks/` - коллекция проектных блоков.
        - `{blockName}/` - директория блока.
            - `vendors/` - блок может включать в себя сторонние библиотеки, эта директория предназначена для их хранения. **Внимание!** Использование вендора одного блока в других является плохой практикой, если есть необходимость в таком действии, возножно стоит выделить его в отдельный блок.
            - `{blockName}.js` - js реализация блока.
            - `{blockName}.less` - css (Less) реализация блока.
        - `_bases/` - core-блок (core-блок - неисключаемый из проекта блок с жизненноважным содержимым для проекта) содержащий бозовые стили, скрипты, нормалайзеры и модернайзеры.
        - `_utilities/` - core-блок с коллекцией утититных класов, имеют характерный префикс `.u-{utilName}`. Например, `.u-text-center`.
    - `mixins.less` - коллекция проектных миксинов для less.
    - `variables.js` - коллекция проектных глобальных переменных для js.
    - `variables.less` - коллекция проектных глобальных переменных для less.
- `blank/` - заготовка для быстрого старата работы над проектом, можно выносить за пределы директории SFET поправив путь в `config.js`.
    - `dynamic/`- директория для различных временных файлов, которые подключаются в html-коде проекта подразумевая их последующее динамическое изменение. После интергации с CMS рекомендую избавится от этой директории во избежание замусоривания системы.
    - `static/` - директория для храниния статики проекта, сюда же Gulp ложит скомпилированные, склееные и минифицинованные скрипты и стили блоков проекта. Можно переимоновать изменив параметр `build.path` в `config.js`.
        - `favicon/` - директория для фавиконов проекта, рекомендую генерировать при помощи [realfavicongenerator.net](http://realfavicongenerator.net/).
        - `fonts/` - директория для шрифтов (в том числе иконочных) проекта.
        - `images/` - графика, которая используется в стилях или скриптах.
        - `jquery-*.min.js` - файл библиотеки jQuery используемый при недоступности его из CDN.
        - `scripts.min.js` - склееные и минифицинованные скрипты блоков проекта.
        - `styles.min.css` - скомпилированные, склееные и минифицинованные стили блоков проекта.
    - `footer.php` - заготовки подвала проекта.
    - `header.php` - заготовка шапки проекта.
    - `index.php` - заготовка тела страницы проекта.
- `lib/` - коллекция блоков.
- `config.js` - файл конфигурации SFET.
- `declaration.js` - файл для декларирования блоков проекта, позволяет контролировать очередь склейки кода (одинаковая последовательность для css/js) блоков и их вендоров.
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

### Спецификация и советы
- SFET использует смесь стилей [React](https://ru.bem.info/methodology/naming-convention/#%D0%A1%D1%82%D0%B8%D0%BB%D1%8C-react) и [No-namespace](https://ru.bem.info/methodology/naming-convention/#%D0%A1%D1%82%D0%B8%D0%BB%D1%8C-no-namespace):
    - Если имя блока, елемента или модификатора содержит несколько слов - разделяй их используя camelSpace.
    - Между блоком и елементом используй дефис "-": `.{blockName}-{elemName}`. Например, `.header-logo`.
    - Используй в качестве префикса для модификаторов подчеркивание "_": `._{modName}`. Напирмер, `._shown`.
    - SFET допусткает использование модификатора без значений. Если же модификатор имеет значения, то используй между ними дефис "-": `._{modName}-{valName}`. Напирмер, `._size-sm`.
- Названия папки и файлов блока дожно включать в себя исключительно его название: `{blockName}/{blockName}.*`.Напирмер, `header/header.less`.
- Присваивай class блока html-елементу, даже если к нему нет стилей: `class="{blockName}"`. Напирмер, `class="header"`.
- Используй идентификаторы только для связи с js, каждый id должен включать префикс с названием блока указанный через "-": `#{blockName}-*`. Напирмер, `#modal-callback`.
- Включай во все data-атрибуты название блока в нижнем регистре (camelSpace вызовет семантические ошибки при чтении) - `data-{blockname}-*="..."`. Напирмер, data-атрибут для блока `.videoReview` или его елементов: `data-videoreview-src="..."`.
- Пиши стили елементов без вложенности в блок:
```less
// Неправильно
.modal {
    .modal-inner {
        ...
    }
}

// Правильно
.modal {
    ...
}
.modal-inner {
    ...
}
```
- В стилях объявляй мофикаторы мультиклассом, SFET допускает возможность влиять на елементы модификатором блока при помощи вложености (единственной допустимый случай):
```less
.modal {
    &._shown {
        .modal-inner {
            ...
        }
    }
}
```
- Использование модификаторов предполагает возможность их динамического переключения при помощи js (jQuery).
- Поскольку мы используем стиль No namespace, хорошим тоном будет всегда стараться присваивать в html классы модификаторов сразу после блоков или елементов к которым они принеджедат. Это, а также присваивание утилитарных классов после всех остальных, значительно упростит чтение кода. Например, `class="grid-col _ld-6 box _size-sm u-text-center"`. 

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
- Наполнить коллекцию миксинов.
- Найти замену блоку grid построенную на flexbox.

## Авторы
- Dmitry Pripa - ceo@seniorro.com

## Копирайт и лицензия
© 2017-2018 [Seniorro](https://seniorro.com). Код опубликован за лицензией [MIT](https://github.com/Seniorro/SFET/blob/master/LICENSE).