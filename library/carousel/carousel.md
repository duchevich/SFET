# Carousel
This component is based in modified module "carousel" by Bootstrap (v.3.3.7).
  
**What changed?**
- Edited `css` classes by BEM-naming.

[**Default docs**](https://getbootstrap.com/docs/3.3/javascript/#carousel)

### Gist
````html
<div class="carousel is-slide" id="carousel" data-ride="carousel" data-interval="false">
    <div class="carousel--controls">
        <a href="#carousel" class="carousel--control carousel--control-left" data-slide="prev"><</a>
        <a href="#carousel" class="carousel--control carousel--control-right" data-slide="next">></a>
    </div>
    <div class="carousel--items">
        <div class="carousel--item is-active">
            <div class="carousel--content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error molestiae quia quidem repudiandae tempore? Alias aliquid corporis est et expedita incidunt, iste laboriosam, laudantium molestias repellendus repudiandae, sed velit voluptatum?
            </div>
        </div>
        <div class="carousel--item">
            <div class="carousel--content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error molestiae quia quidem repudiandae tempore? Alias aliquid corporis est et expedita incidunt, iste laboriosam, laudantium molestias repellendus repudiandae, sed velit voluptatum?
            </div>
        </div>
    </div>
    <ul class="carousel--indicators">
        <li data-slide-to="0" class="is-active"></li>
        <li data-slide-to="1"></li>
    </ul>
</div>
````

### Options
Attribute for **.carousel** `data-dynamic-height="true"`