org.pinf.genesis.inception
==========================

The first (`inception`) incarnation of a **NodeJS based Web Software System Development Toolchain** (`genesis`) that follows the *PINF Toolchain* model.


Notes
-----

  * `inf` **interfaces** specify the interaction pipes between components. As long as two interfaces inherit from the same contract they are compatible.
  * `inf` **contracts** specify the interaction medium between components. Contracts are used to validate what flows between components in the form of payload & API schemas. Communication that follows the contract can flow through any compatible interface.
