![version](https://img.shields.io/badge/dynamic/json.svg?label=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fseniorro%2Fsfet%2Fmaster%2Fpackage.json&query=version&colorB=green)
![license](https://img.shields.io/badge/dynamic/json.svg?label=license&url=https%3A%2F%2Fraw.githubusercontent.com%2Fseniorro%2Fsfet%2Fmaster%2Fpackage.json&query=license&colorB=blue)

# Seniorro Front-End Toolkit (SFET)
SFET - это стек технологий для разработки front-end, содержит:
- готовые таски для системы сборки Gulp.
- собственную упрощенную интерпритацию нейминга методоголии БЭМ.
- микрофремворк содержащий базовые блоки необходимые на каждом проекте.

## Файловая структура
- _lib - коллекция блоков.
- _sources
    - _blocks - коллекция проектных блоков.
    - _mixins - коллекция проектных миксинов для less.
    - _variables - коллекция проектных переменных, как для less, так и для js.
- dist
- _config.js - файл конфигурации SFET.
- _declaration.js  - декрарация в которой нужно указывать блоки проекта, можно контролировать очередь загрузки css и js.
- _gulpfile.js  - файл конфигурации системы сборки Gulp (обычно не требует никакого вмешательства, вноси изминения исключительно зная что делаешь и на свой страх и риск).
- package.json - файл пакетного менеджера npm.

## Соглашение об именовании
Система именования организована основываясь на методологии БЭМ с упрощением некоторых практик. Разделы официальной документации которые нужно прочесть:

### Полезное чтиво
- [Быстрый старт](https://ru.bem.info/methodology/quick-start/)
- [Основные понятия](https://ru.bem.info/methodology/key-concepts/)
- [Соглашение по именованию](https://ru.bem.info/methodology/naming-convention/)
- [CSS по БЭМ](https://ru.bem.info/methodology/css/)
- [Неофициальная краткая документация БЭМ](http://nicothin.github.io/idiomatic-pre-CSS/)

### Спецификация
- Если имя блока, елемента или модификатора содержит несколько слов - разделяй их используя camelSpace.
- Между блоком и елементом используй "-" (.block-elem).
- Используй префикс "_" для модификаторов в стиле no namespace (._mod).
- Названия папки и файлов блока дожно включать в себя исключительно его название (block/block.*).
- Присваивай class блока html-елементу (class="block"), даже если к нему нет стилей, это позволяет определить его область.
- Используй идентификаторы только для связи с js, каждый id должен включать префикс с названием блока указанный через "-" (#block-*).
- Включай во все data-атрибуты название блока сразу после "data" (data-block-*="...").

# Планы
- Миграция с less на scss.
- Создание коллекции миксинов.
- Найти замену grid.
