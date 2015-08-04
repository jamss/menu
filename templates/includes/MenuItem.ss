<li class="$ClassName<% if $Children %> has-child-menu<% end_if %>">
    <a href="$Link" class="<% if $IsSection %>active<% end_if %><% if $Children %> has-child-menu<% end_if %>">$MenuTitle</a>
    <% if $Children %>
        <i class="fa fa-chevron-right child-menu-trigger"></i>
        <ul class="sub-menu">
            <li><i class="fa fa-chevron-left close-menu-trigger"></i> $MenuTitle</li>
            <% loop $Children %>
                <% include MenuItem %>
            <% end_loop %>
        </ul>
    <% end_if %>
</li>