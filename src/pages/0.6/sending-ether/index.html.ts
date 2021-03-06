// metadata
export const version = "0.6.10"
export const title = "Sending Ether (transfer, send, call)"
export const description = "An example of sending Ether in Solidity"

const html = `<h3 id="how-to-send-ether">How to send Ether?</h3>
<p>You can send Ether to other contracts by</p>
<ul>
<li><code>transfer</code> (2300 gas, throws error)</li>
<li><code>send</code> (2300 gas, returns bool)</li>
<li><code>call</code> (forward all gas or set gas, returns bool)</li>
</ul>
<h3 id="how-to-receive-ether">How to receive Ether?</h3>
<p>A contract receiving Ether must have at least one of the functions below</p>
<ul>
<li><code>receive() external payable</code></li>
<li><code>fallback() external payable</code></li>
</ul>
<p><code>receive()</code> is called if <code>msg.data</code> is empty, otherwise <code>fallback()</code> is called.</p>
<h3 id="which-method-should-you-use">Which method should you use?</h3>
<p><code>call</code> in combination with re-entrancy guard is the recommended method to use after December 2019.</p>
<p>Guard against re-entrancy by</p>
<ul>
<li>making all state changes before calling other contracts</li>
<li>using re-entrancy guard modifier</li>
</ul>
<pre><code class="language-solidity">// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;

contract ReceiveEther {
    /*
    Which function is called, fallback() or receive()?

           send Ether
               |
         msg.data is empty?
              / \\
            yes  no
            /     \\
receive() exists?  fallback()
         /   \\
        yes   no
        /      \\
    receive()   fallback()
    */

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract SendEther {
    function sendViaTransfer(address payable _to) public payable {
        // This function is no longer recommended for sending Ether.
        _to.transfer(msg.value);
    }

    function sendViaSend(address payable _to) public payable {
        // Send returns a boolean value indicating success or failure.
        // This function is not recommended for sending Ether.
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }

    function sendViaCall(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}
</code></pre>
`

export default html
