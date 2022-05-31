# Commands

```sh
# 1 day 100stake lock-tokens command
joltifyd tx lockup lock-tokens 200stake --duration="86400s" --from=validator --chain-id=testing --keyring-backend=test --yes

# 5s 100stake lock-tokens command
joltifyd tx lockup lock-tokens 100stake --duration="5s" --from=validator --chain-id=testing --keyring-backend=test --yes

# begin unlock tokens, NOTE: add more gas when unlocking more than two locks in a same command
joltifyd tx lockup begin-unlock-tokens --from=validator --gas=500000 --chain-id=testing --keyring-backend=test --yes

# unlock tokens, NOTE: add more gas when unlocking more than two locks in a same command
joltifyd tx lockup unlock-tokens --from=validator --gas=500000 --chain-id=testing --keyring-backend=test --yes

# unlock specific period lock
joltifyd tx lockup unlock-by-id 1 --from=validator --chain-id=testing --keyring-backend=test --yes

# account balance
joltifyd query bank balances $(joltifyd keys show -a validator --keyring-backend=test)

# query module balance
joltifyd query lockup module-balance

# query locked amount
joltifyd query lockup module-locked-amount

# query lock by id
joltifyd query lockup lock-by-id 1

# query account unlockable coins
joltifyd query lockup account-unlockable-coins $(joltifyd keys show -a validator --keyring-backend=test)

# query account locks by denom past time
joltifyd query lockup account-locked-pasttime-denom $(joltifyd keys show -a validator --keyring-backend=test) 1611879610 stake

# query account locks past time
joltifyd query lockup account-locked-pasttime $(joltifyd keys show -a validator --keyring-backend=test) 1611879610

# query account locks by denom with longer duration
joltifyd query lockup account-locked-longer-duration-denom $(joltifyd keys show -a validator --keyring-backend=test) 5.1s stake

# query account locks with longer duration
joltifyd query lockup account-locked-longer-duration $(joltifyd keys show -a validator --keyring-backend=test) 5.1s

# query account locked coins
joltifyd query lockup account-locked-coins $(joltifyd keys show -a validator --keyring-backend=test)

# query account locks before time
joltifyd query lockup account-locked-beforetime $(joltifyd keys show -a validator --keyring-backend=test) 1611879610
```
