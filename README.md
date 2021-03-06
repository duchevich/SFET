![version](https://img.shields.io/badge/dynamic/json.svg?label=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fseniorro%2Fsfet%2Fmaster%2Fpackage.json&query=version&colorB=green)
![license](https://img.shields.io/badge/dynamic/json.svg?label=license&url=https%3A%2F%2Fraw.githubusercontent.com%2Fseniorro%2Fsfet%2Fmaster%2Fpackage.json&query=license&colorB=blue)

# Seniorro Front-End Toolkit (SFET)
SFET - стек технологий для разработки front-end с простым и понятным минифреймворком. Содержит:
- таски системы сборки Gulp для компонентного подхода в разработке;
- упрощенную схему именования методологии БЭМ;
- набор базовых компонентов оформленных в БЭМ блоки для разработки HTML, CSS и JS;
- базовый шаблон проекта (php) для быстрого старта.


## Содержание
- [Быстрый старт](#Быстрый-старт)
- [Структура](#Структура)
- [Правила именования](#Правила-именования)
    - [Принципы БЭМ](#Принципы-БЭМ)
    - [Пространства имен](#Пространства-имен)
    - [Рекомендации](#Рекомендации)
- [Конфигурирование](#Конфигурирование)
- [Декларирование компонентов](#Декларирование-компонентов)
- [Авторы](#Авторы)
- [Копирайт и лицензия](#Копирайт-и-лицензия)


## Быстрый старт
- [Скачай](https://github.com/Seniorro/SFET/archive/master.zip) или клонируй репозиторий: `git clone https://github.com/Seniorro/SFET.git`.
- У тебя должны быть установлены [Node.js](https://nodejs.org/) и [PHP](http://php.net/downloads.php).
- Установи зависимости из `package.json`: `npm install`.
- Запусти [встроенный веб-сервер CLI SAPI](http://php.net/manual/ru/features.commandline.webserver.php) в директории `blank/`: `cd blank && php -S 127.0.0.1:8000`
- Используй такси Gulp:
    - `gulp` (`gulp default`)
    - `gulp build`
    - `gulp script`
    - `gulp styles`
    - `gulp del`


## Структура
- `components/` - директория коллекции компонентов.
    - `{componentName}/` - директория компонента.
        - `vendors/` - компонент может включать в себя сторонние библиотеки (вендоры, поставщики), эта директория предназначена для их хранения.
        - `{componentName}.js` - js реализация компонента.
        - `{componentName}.less` - css (Less) реализация компонента.
    - `bases/` - компонент с стилями к селекторам, базовыми скриптами, нормалайзерами и модернайзерами.
    - `utilities/` - компонент с коллекцией утилитных классов.
- `blank/` - заготовка для быстрого старта работы, можно выносить за пределы директории SFET поправив путь к `static/` в `config.js` (параметр `build.path`).
    - `dynamic/`- директория для различных временных файлов, которые подключаются в html-коде проекта подразумевая их последующее динамическое изменение. После интеграции с CMS рекомендую избавится от этой директории во избежание замусоривания системы.
    - `static/` - директория для хранения статики, сюда же Gulp кладет скомпилированные, склеенные и минифицинованные скрипты и стили компонентов. Можно переименовать или переместить изменив параметр `build.path` в `config.js`.
        - `favicon/` - директория для фавиконов, рекомендую генерировать при помощи http://realfavicongenerator.net/.
        - `fonts/` - директория для шрифтов (в том числе иконочных).
        - `images/` - графика, которая используется в стилях или скриптах.
        - `jquery-*.min.js` - файл библиотеки jQuery используемый при недоступности его из CDN.
        - `common.min.js` - склеенные и минифицинованные скрипты компонентов.
        - `common.min.css` - скомпилированные, склеенные и минифицинованные стили компонентов.
    - `footer.php` - заготовка подвала проекта.
    - `header.php` - заготовка шапки проекта.
    - `index.php` - заготовка тела страницы проекта.
- `globals.js` - коллекция глобальных переменных для js.
- `globals.less` - коллекция глобальных переменных для less.
- `config.js` - файл конфигурации системы сборки.
- `declaration.js` - файл для декларирования компонентов, позволяет контролировать очередь склейки (одинаковая последовательность для css/js) файлов.
- `gulpfile.js`  - файл системы сборки Gulp.
- `package.json` и `package-lock.json` - файлы пакетного менеджера NPM.


## Правила именования
БЭМ - система именования (нейминг) используемая по-умолчанию для оформления компонентов SFET. Вариант использования БЭМ в контексте SFET содержит пространства имен, чтобы избежать коллизий кода разного происхождения и не ограничивать тебя в нейминге. Если на твоем проекте не нужен БЭМ - не используй его, или используй его для выборочных компонентов.

### Принципы БЭМ
- Официальная документация БЭМ
    - [Быстрый старт](https://ru.bem.info/methodology/quick-start/)
    - [Основные понятия](https://ru.bem.info/methodology/key-concepts/)
    - [Соглашение по именованию](https://ru.bem.info/methodology/naming-convention/)
        - [Стиль React](https://ru.bem.info/methodology/naming-convention/#%D0%A1%D1%82%D0%B8%D0%BB%D1%8C-react)
        - [Стиль No-namespace](https://ru.bem.info/methodology/naming-convention/#%D0%A1%D1%82%D0%B8%D0%BB%D1%8C-no-namespace)
    - [CSS по БЭМ](https://ru.bem.info/methodology/css/)
- [Неофициальная краткая документация БЭМ](http://nicothin.github.io/idiomatic-pre-CSS/)

### Пространства имен
SFET использует префиксы в виде сокращений имен сущностей ("utility" = u) для обозначения пространств имен (неймспейсов).
- `b` (block) - неймспейс компонетов в виде БЭМ блоков:
    - Используй в качестве префикса в имени директорий/файлов (`b-{blockName}/b-{blockName}.*`) и классов (`.b-{blockName}`) блоков.
    - В классе или id элемента между его именем и блоком используй дефис "-": `.b-{blockName}-{elementName}`.
- `m` (modifier) - неймспейс классов модификаторов для БЭМ блоков: `.m-{modifierName}`.
    - Допускаеться использование модификатора без значений. Если же модификатор имеет значения, то используй между ними дефис "-": `.m-{modifierName}-{valueName}`.
- `u` (utility) - неймспейс утилитных классов компонента `utilities`: `.u-{utilityName}`. 
- `g` (global) - неймспейс глобальный переменных:
    - Объект `_G` как агрегатор глобальных переменных js в файле `globals.js`.
    - Префикс `@v-{globalVarName}` для глобальных переменных less в файле `globals.less`.

### Рекомендации
- Если имя блока, элемента или модификатора содержит несколько слов - разделяй их используя camelSpace.
- Класс блока на html-элементе указывает на его root, рекомендую присваивать `class="b-{blockName}"` даже если к нему нет стилей.
- Включай во все data-атрибуты название блока в нижнем регистре (camelSpace вызовет семантические ошибки при чтении) - `data-b-{blockname}-*="..."`. Например, data-атрибут для блока `b-videoReview` или его элементов: `data-b-videoreview-src="..."`.
- Пиши стили элементов без вложенности в блок:
```less
// Неправильно
.b-modal {
    .b-modal-inner {
        ...
    }
}
// Правильно
.b-modal {
    &-inner {
        ...
    }
}
```
- В стилях объявляй модификаторы мультиклассом, SFET допускает возможность влиять на элементы модификатором блока при помощи вложенности:
```less
.b-modal {
    &.m-shown {
        .b-modal-inner {
            ...
        }
    }
}
```
- Использование модификаторов предполагает возможность их динамического переключения при помощи js (jQuery).
- Поскольку мы используем стиль No namespace, хорошим тоном будет присваивать в html классы модификаторов сразу после блоков или элементов к которым они принадлежат. Это, а также присваивание утилитарных классов после всех остальных, значительно упростит чтение кода. Например, `class="b-grid-col m-ld-6 b-box m-size-sm u-text-center"`.


## Конфигурирование SFET
SFET позволяет настроить ряд опций в файле `config.js`.
- `watch`
    - `proxy`
    - `port`
    - `tpl`
- `components`
    - `path`
- `build`
    - `sourceMaps`
    - `path`
    - `scripts`
        - `name`
        - `mangleExcept`
    - `styles`
        - `name`
        - `autoPrefixer`


## Декларирование компонентов
Компоненты следует декларировать в файле `declaration.js`, это позволит сборщику узнать о их существовании и порядке склейки файлов. Ключ `n` (name) - имя компонента, ключ `v` (vendors) - массив имен поставщиков компонента. Декларировать компоненты следует в следующем формате:
```js
{n:'{componentName}', v:['{vendor1Name}', '{vendor2Name}', '{vendor3Name}']}
```


## Авторы
- Dmitry Pripa - i@dpripa.com


## Копирайт и лицензия
© 2017-2018 [Seniorro](https://seniorro.com). Код опубликован за лицензией [MIT](https://github.com/Seniorro/SFET/blob/master/LICENSE).