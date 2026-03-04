# 🔧 PRE-COMMIT HOOK SETUP GUIDE

## ⚡ Quick Setup (30 seconds)

```bash
# 1. Make hooks executable
chmod +x .githooks/pre-commit
chmod +x verify-tokens.sh

# 2. Tell git to use the custom hooks directory
git config core.hooksPath .githooks

# 3. Test it works
./.githooks/pre-commit

# 4. Run comprehensive verification
./verify-tokens.sh
```

You should see:
```
🔍 Checking for incorrect --accent usage (BLUE instead of TEAL)...
✅ All components use correct tokens (TEAL for brand, BLUE only for info)
```

---

## ✅ What This Does

The pre-commit hook **automatically prevents** you from committing code that uses:

❌ `bg-accent` for brand elements (should be `bg-primary` or `bg-secondary`)  
❌ `text-accent-foreground` for brand text (should be `text-foreground`)  
❌ `hover:bg-accent` for hovers (should be `hover:bg-secondary`)  
❌ `focus:bg-accent` for focus states (should be `focus:bg-secondary`)  
❌ `data-[state=on]:bg-accent` for toggles (should be `data-[state=on]:bg-primary`)

**It ALLOWS:**  
✅ `var(--accent)` ONLY for `variant="info"` (semantic info states)

---

## 🧪 How To Test

### **Test 1: Try to commit a file with incorrect usage**

```bash
# Create a test file with incorrect usage
echo 'const Test = () => <div className="bg-accent" />' > src/test.tsx

# Try to commit it
git add src/test.tsx
git commit -m "test"
```

**Expected result:**
```
❌ ERROR: Found incorrect --accent usage (should use --primary or --secondary)

Incorrect usage found in:
src/test.tsx:1:const Test = () => <div className="bg-accent" />

Fix patterns:
  bg-accent → bg-primary (for brand) or bg-secondary (for hover)
```

**Commit is BLOCKED** ✅

### **Test 2: Correct the file and try again**

```bash
# Fix the file
echo 'const Test = () => <div className="bg-primary" />' > src/test.tsx

# Try to commit again
git add src/test.tsx
git commit -m "test"
```

**Expected result:**
```
🔍 Checking for incorrect --accent usage (BLUE instead of TEAL)...
✅ All components use correct tokens (TEAL for brand, BLUE only for info)
[main abc1234] test
```

**Commit is ALLOWED** ✅

---

## 📝 Manual Verification (Without Committing)

```bash
# Run the hook manually
./.githooks/pre-commit

# Or search manually
grep -r "bg-accent\|text-accent-foreground" src/app/components/ui/ src/atoms/ | grep -v "variant=\"info\""
```

**Zero results = all good!** ✅

---

## 🔧 Troubleshooting

### **Hook not running?**

```bash
# Check git config
git config core.hooksPath

# Should output: .githooks
# If not, run:
git config core.hooksPath .githooks
```

### **Permission denied?**

```bash
# Make hook executable
chmod +x .githooks/pre-commit

# Verify
ls -l .githooks/pre-commit
# Should show: -rwxr-xr-x (executable)
```

### **Want to skip the hook (NOT RECOMMENDED)?**

```bash
# Only use in emergencies
git commit --no-verify -m "message"
```

**Warning:** Skipping defeats the purpose. Only use if hook has a bug.

---

## 🎯 What Gets Checked

### **Checked Directories:**
- `src/app/components/ui/` - UI components
- `src/atoms/` - Atomic design system components

### **Checked Patterns:**
- `bg-accent`
- `text-accent-foreground`
- `hover:bg-accent`
- `focus:bg-accent`
- `data-[state=on]:bg-accent`
- `data-[selected=true]:bg-accent`

### **Excluded (Legitimate Uses):**
- `variant="info"` - Info alerts/messages
- `variant: "info"` - TypeScript variant type
- `info:` - Variant color maps
- `.md:` - Markdown files

---

## 📚 Related Documentation

- `/Guidelines.md` - Complete token usage rules
- `/BLUE-TEAL-FIX-COMPLETE.md` - What was fixed
- `/src/imports/token-audit-blue-vs-teal.md` - Technical audit

---

## ✅ Success Checklist

- [ ] Hook is executable (`chmod +x`)
- [ ] Git is configured (`git config core.hooksPath`)
- [ ] Test 1 blocks incorrect commit
- [ ] Test 2 allows correct commit
- [ ] Team members know how to set it up
- [ ] Documented in team onboarding

---

## 🎉 You're Protected!

Every commit is now automatically checked for BLUE vs TEAL confusion.

**No more accidental blue brand elements!** 🎨

---

**Questions?** See `/Guidelines.md` for full token usage rules.