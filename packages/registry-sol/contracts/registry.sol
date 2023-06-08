//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Registry {

    string[] public dids;

    constructor() {}

    /* ===================================================================================== */
    /* External Functions                                                                    */
    /* ===================================================================================== */

    function list() external view returns (string[] memory) {
        return dids;
    }

    function addDid(string memory did) external returns (bool) {
        dids.push(did);
        return true;
    }

}