<div id="mobile-menu">
    <div id="close-menu-container">
        <i class="fa fa-times" id="close-menu"></i>
    </div>
    <ul>
        <% loop $Menu(1) %>
            <% include MenuItem %>
        <% end_loop %>
    </ul>
</div>